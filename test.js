const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
  PageNumber,
  LevelFormat,
  PageBreak,
  TableOfContents,
} = require("docx");
const fs = require("fs");

const BLUE_DARK = "1F3864";
const BLUE_MED = "2E75B6";
const BLUE_LIGHT = "D6E4F7";
const BLUE_HEADER = "BDD7EE";
const GRAY_LIGHT = "F2F2F2";

const border = { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" };
const borders = { top: border, bottom: border, left: border, right: border };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 36,
        color: BLUE_DARK,
        font: "Arial",
      }),
    ],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 30,
        color: BLUE_MED,
        font: "Arial",
      }),
    ],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 220, after: 100 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 26,
        color: "1F497D",
        font: "Arial",
      }),
    ],
  });
}

function h4(text) {
  return new Paragraph({
    spacing: { before: 180, after: 80 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 24,
        color: "375623",
        font: "Arial",
        italics: true,
      }),
    ],
  });
}

function body(text, { bold = false, color = "000000", spacing = {} } = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80, line: 320, ...spacing },
    children: [new TextRun({ text, bold, size: 22, font: "Arial", color })],
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { before: 60, after: 60, line: 300 },
    children: [new TextRun({ text, size: 22, font: "Arial" })],
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function sectionDivider(text) {
  return new Paragraph({
    spacing: { before: 300, after: 160 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE_MED, space: 1 },
    },
    children: [new TextRun({ text: "", size: 4 })],
  });
}

function makeInfoBox(title, content) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: 9360, type: WidthType.DXA },
            shading: { fill: BLUE_LIGHT, type: ShadingType.CLEAR },
            margins: { top: 100, bottom: 100, left: 160, right: 160 },
            children: [
              new Paragraph({
                spacing: { before: 60, after: 40 },
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    size: 22,
                    color: BLUE_DARK,
                    font: "Arial",
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 40, after: 60 },
                children: [
                  new TextRun({ text: content, size: 22, font: "Arial" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function makeTable2Col(headers, rows) {
  const colW1 = 2800,
    colW2 = 6560;
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [colW1, colW2],
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map(
          (h, i) =>
            new TableCell({
              borders,
              width: { size: i === 0 ? colW1 : colW2, type: WidthType.DXA },
              shading: { fill: BLUE_MED, type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: h,
                      bold: true,
                      size: 22,
                      color: "FFFFFF",
                      font: "Arial",
                    }),
                  ],
                }),
              ],
            }),
        ),
      }),
      ...rows.map(
        (row, ri) =>
          new TableRow({
            children: row.map(
              (cell, ci) =>
                new TableCell({
                  borders,
                  width: {
                    size: ci === 0 ? colW1 : colW2,
                    type: WidthType.DXA,
                  },
                  shading: {
                    fill: ri % 2 === 0 ? "FFFFFF" : GRAY_LIGHT,
                    type: ShadingType.CLEAR,
                  },
                  margins: { top: 80, bottom: 80, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      spacing: { line: 280 },
                      children: [
                        new TextRun({ text: cell, size: 22, font: "Arial" }),
                      ],
                    }),
                  ],
                }),
            ),
          }),
      ),
    ],
  });
}

function makeTable3Col(headers, rows) {
  const w = [2200, 2500, 4660];
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: w,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map(
          (h, i) =>
            new TableCell({
              borders,
              width: { size: w[i], type: WidthType.DXA },
              shading: { fill: BLUE_DARK, type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: h,
                      bold: true,
                      size: 22,
                      color: "FFFFFF",
                      font: "Arial",
                    }),
                  ],
                }),
              ],
            }),
        ),
      }),
      ...rows.map(
        (row, ri) =>
          new TableRow({
            children: row.map(
              (cell, ci) =>
                new TableCell({
                  borders,
                  width: { size: w[ci], type: WidthType.DXA },
                  shading: {
                    fill: ri % 2 === 0 ? "FFFFFF" : BLUE_LIGHT,
                    type: ShadingType.CLEAR,
                  },
                  margins: { top: 80, bottom: 80, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      spacing: { line: 280 },
                      children: [
                        new TextRun({ text: cell, size: 22, font: "Arial" }),
                      ],
                    }),
                  ],
                }),
            ),
          }),
      ),
    ],
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: BLUE_DARK },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: BLUE_MED },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "1F497D" },
        paragraph: { spacing: { before: 220, after: 100 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
          {
            level: 1,
            format: LevelFormat.BULLET,
            text: "\u25E6",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1080, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1300, bottom: 1440, left: 1440 },
        },
      },
      children: [
        // ===================== TRANG BÌA =====================
        new Paragraph({
          spacing: { before: 2400 },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "BAO CAO KHOA HOC",
              bold: true,
              size: 28,
              color: BLUE_MED,
              font: "Arial",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 400, after: 200 },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "VAT LIEU NANO VA CAU TRUC NANO:",
              bold: true,
              size: 48,
              color: BLUE_DARK,
              font: "Arial",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 100, after: 600 },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Tong Quan, Cau Truc, Phuong Phap Che Tao va Ung Dung",
              bold: true,
              size: 36,
              color: BLUE_MED,
              font: "Arial",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 100 },
          border: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 8,
              color: BLUE_MED,
              space: 1,
            },
          },
          children: [new TextRun({ text: "", size: 4 })],
        }),
        new Paragraph({
          spacing: { before: 400 },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "GS.TS. Nguyen Van Khoa",
              bold: true,
              size: 28,
              font: "Arial",
              color: BLUE_DARK,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 80 },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Phong Nghien Cuu Vat Lieu Nano - 10 nam kinh nghiem",
              size: 24,
              font: "Arial",
              color: "555555",
              italics: true,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 600 },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Ha Noi, 2024",
              size: 24,
              font: "Arial",
              color: "444444",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 80 },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Tham khao: Jeevanandam et al., Beilstein J. Nanotechnol. 2018, 9, 1050-1074",
              size: 20,
              font: "Arial",
              color: "888888",
              italics: true,
            }),
          ],
        }),

        pageBreak(),

        // ===================== TOM TAT =====================
        h1("TOM TAT"),
        body(
          "Bao cao nay trinh bay mot cach he thong va toan dien ve vat lieu nano (Nanomaterials - NMs) va cac cau truc nano (Nanostructured Materials - NSMs) - mot linh vuc nghien cuu dang bung no manh me trong khoa hoc va cong nghe hien dai. Voi hon 10 nam kinh nghiem trong linh vuc nay, chung toi tong hop, phan tich va he thong hoa kien thuc tu nhieu nguon tai lieu uy tin nham cung cap cho nguoi doc mot buc tranh day du nhat.",
        ),
        new Paragraph({ spacing: { before: 60, after: 60 } }),
        body(
          "Bao cao duoc cau truc theo 4 phan chinh: (1) Tong quan lich su va phan loai NMs; (2) Phan tich cau truc va su thay doi tinh chat theo thong so nano; (3) He thong cac phuong phap che tao NMs bao gom cac phuong phap vat ly, hoa hoc va sinh hoc cung tac dong cua cac thong so che tao; (4) Ung dung thuc tien trong y sinh hoc, cong nghiep, nang luong va moi truong.",
        ),

        pageBreak(),

        // ===================== MUC LUC =====================
        h1("MUC LUC"),
        body("I.    GIOI THIEU TONG QUAN"),
        body("II.   LICH SU PHAT TRIEN"),
        body("III.  PHAN LOAI VAT LIEU NANO"),
        body("IV.   CAU TRUC VA SU THAY DOI TINH CHAT"),
        body("V.    CAC PHUONG PHAP CHE TAO"),
        body("      5.1  Phuong phap vat ly"),
        body("            5.1.1  Nghien co hoc"),
        body("            5.1.2  Boc hoi vat lieu - Ngung tu khi"),
        body("            5.1.3  Boc hoi laser xung"),
        body("            5.1.4  Phun xuong ion"),
        body("      5.2  Phuong phap hoa hoc"),
        body("            5.2.1  Khu hoa hoc"),
        body("            5.2.2  Keo tu sol-gel"),
        body("            5.2.3  Lang dong hoa hoi hoa hoc (CVD)"),
        body("            5.2.4  Phan ung thuy nhiet"),
        body("      5.3  Phuong phap sinh hoc"),
        body("            5.3.1  Tu hop sinh hoc (vi khuan)"),
        body("            5.3.2  Tong hop tu chiet xuat thuc vat"),
        body("            5.3.3  Tong hop tu nam / men"),
        body("VI.   TAC DONG CUA THONG SO CHE TAO"),
        body("VII.  KET LUAN VA UNG DUNG"),

        pageBreak(),

        // ===================== PHAN I: GIOI THIEU =====================
        h1("I. GIOI THIEU TONG QUAN"),
        h2("1.1 Dinh nghia va quy mo"),
        body(
          "Vat lieu nano (NMs) la nhom vat lieu co it nhat mot chieu khong gian nam trong khoang 1-100 nm (1 nm = 10^-9 m). Day la thang do rat dac biet - nho hon vi khuan nhung lon hon nguyen tu don le - noi vat lieu bat dau the hien cac tinh chat hoan toan khac biet so voi vat lieu khoi (bulk material) cung thanh phan.",
        ),
        body(
          "Vi du dien hinh: vang (Au) o dang khoi co mau vang dac trung, nhung khi duoc thu nho xuong thanh hat nano 20 nm, no lai hien thi mau do tuoi; va o kich thuoc 2-5 nm, no co the phat sang huong quang. Day chinh la hien tuong 'hieu ung kich thuoc luong tu' (quantum size effect) - nen tang ly thuyet cot loi cua khoa hoc nano.",
        ),
        new Paragraph({ spacing: { before: 100 } }),
        makeInfoBox(
          "Tai sao vat lieu nano lai dac biet?",
          "Khi vat lieu duoc thu nho xuong thang nano, ty le dien tich be mat / the tich tang vot. Mot hat Au 10 nm co ~30% so nguyen tu nam tren be mat, trong khi hat 1 mm chi co khoang 0.00001%. Cac nguyen tu be mat co nang luong cao hon, de phan ung hon, dan den su bien doi sau sac ve tinh chat hoa hoc, quang, tu, dien va co hoc.",
        ),
        new Paragraph({ spacing: { before: 100 } }),

        h2("1.2 Cac dinh nghia quoc te"),
        body(
          "Hien chua co mot dinh nghia quoc te thong nhat duy nhat cho NMs. Cac to chuc uy tin dinh nghia khac nhau:",
        ),
        makeTable2Col(
          ["To chuc", "Dinh nghia"],
          [
            [
              "EPA (My)",
              "NMs co tinh chat dac biet khac biet so voi cung chat hoa hoc o kich thuoc lon hon",
            ],
            [
              "USFDA (My)",
              "Vat lieu co it nhat 1 chieu trong khoang ~1-100 nm va the hien hien tuong phu thuoc kich thuoc",
            ],
            [
              "ISO",
              "Vat lieu co bat ky chieu ngoai nao o thang nano hoac co cau truc be mat ben trong o thang nano",
            ],
            [
              "EU Commission",
              "Vat lieu tu nhien, tinh co hay nhan tao chua cac hat co 1+ chieu trong khoang 1-100 nm (>= 50% so phan tu)",
            ],
            [
              "BSI (Anh)",
              "Vat lieu co bat ky cau truc ben trong hoac ben ngoai o thang nano (~1-1000 nm)",
            ],
          ],
        ),
        new Paragraph({ spacing: { before: 120 } }),

        pageBreak(),

        // ===================== PHAN II: LICH SU =====================
        h1("II. LICH SU PHAT TRIEN"),
        h2("2.1 Thoi ky co dai - Khai thac tu nhien"),
        body(
          "Con nguoi da vo tinh su dung NMs tu hon 4.500 nam truoc - bien nien su nay cho thay vat lieu nano khong phai la phat minh cua thoi hien dai ma la su tien hoa cua tri thuc nhan loai:",
        ),
        bullet(
          "~4.500 nam truoc: Soi amiante (asbestos) nano tu nhien duoc tron vao gom su de tang do ben (Dong Co dai)",
        ),
        bullet(
          "~4.000 nam truoc: Nguoi Ai Cap co dai tong hop hat PbS kich thuoc ~5 nm de lam thuoc nhuom toc den",
        ),
        bullet(
          "~3000 nam TCN: 'Xanh Ai Cap' (Egyptian Blue - CaCuSi4O10) la sat pham tong hop dau tien cua nhan loai, thuc chat la vat lieu nano thuy tinh",
        ),
        bullet(
          "400-100 nam TCN: Men gom Celtic co chua hat Cu nano va Cu2O - tao mau do tuoi dac trung",
        ),
        bullet(
          "The ky thu 4 SCN: Chen Lycurgus (La Ma) - vat lieu 2 chieu: do duoi anh sang xuyen, xanh la duoi anh sang phan xa - do hat hop kim Ag-Au (ty le 7:3) kich thuoc nano",
        ),
        bullet(
          "The ky 9 SCN: Nguoi Mesopotamia tao gom bong loang (luster ceramics) voi hat Ag/Cu nano tao mau xanh long canh trung huyen ao",
        ),
        new Paragraph({ spacing: { before: 100 } }),

        h2("2.2 The ky 19-20 - Khoa hoc hoa hoc nano"),
        body(
          "Nam 1857, Michael Faraday lan dau tien mo ta khoa hoc ve dung dich keo vang (Au colloid) - danh dau buoc ngoat: tu 'su dung vo tinh' sang 'nghien cuu co y thuc'. Ong phat hien rang tinh chat quang hoc cua Au keo hoan toan khac biet so voi Au khoi - day la mot trong nhung bao cao som nhat ve hieu ung kich thuoc luong tu.",
        ),
        bullet(
          "1908: Mie giai thich ly thuyet ve mau sac cua kim loai keo qua ly thuyet tan xa anh sang",
        ),
        bullet(
          "Thap nien 1940: SiO2 nano duoc san xuat thuong mai thay the carbon black lam chat gia cuong cho cao su",
        ),
        bullet(
          "1981: Kinh hien vi quet duong ham (STM) ra doi - lan dau tien nhin thay nguyen tu don le",
        ),
        bullet(
          "1985: Phat hien Fullerene (C60) - mo dau ky nguyen vat lieu carbon nano",
        ),
        bullet(
          "1991: Carbon nanotube (CNT) duoc Iijima phat hien - cuoc cach mang trong khoa hoc nano",
        ),
        bullet(
          "2003: Samsung tung san pham may giat dung cong nghe Silver Nano(TM)",
        ),
        bullet(
          "2005: Abraxane(TM) - duoc pham nano dau tien duoc FDA chap thuan tri ung thu",
        ),
        bullet("2014: 1.814 san pham tieu dung nano tren thi truong toan cau"),

        pageBreak(),

        // ===================== PHAN III: PHAN LOAI =====================
        h1("III. PHAN LOAI VAT LIEU NANO"),
        h2("3.1 Phan loai theo thanh phan vat lieu"),
        body("Theo thanh phan, NMs duoc chia thanh 4 nhom chinh:"),

        h3("(i) NMs nen tang carbon"),
        body(
          "Nhom nay chua cac cau truc carbon dac biet nhu Fullerene (C60), ong nano carbon (CNTs), graphene, soi nano carbon, carbon den va carbon onion. Phuong phap san xuat chu yeu: boc hoi laser, phong dien ho quang, CVD. Tinh chat dac trung: do co hoc cuc cao (CNT co modulus Young ~1 TPa), do dan dien tuyet voi, dien tich be mat lon.",
        ),

        h3("(ii) NMs nen tang vo co"),
        body(
          "Bao gom NMs kim loai (Au, Ag, Fe, Cu) va oxit kim loai (TiO2, ZnO, Fe3O4). Nhom nay co ung dung rong rai nhat trong thuc te nho chi phi che tao thap va tinh chat da dang. Dac biet, Au NPs va Ag NPs co hieu ung cong huong plasmon be mat (SPR) tao ra mau sac dac trung.",
        ),

        h3("(iii) NMs nen tang huu co"),
        body(
          "Duoc tao tu hop chat huu co thong qua tu lap rap phan tu (self-assembly). Bao gom: dendrimer, micelle, liposome, polymer NPs. Uu diem lon nhat la tinh tuong hop sinh hoc (biocompatibility) cao, de chuc nang hoa be mat - rat phu hop cho ung dung y sinh hoc va dan truyen thuoc.",
        ),

        h3("(iv) NMs nen tang composite"),
        body(
          "La vat lieu da pha ket hop NPs voi nhau hoac NPs voi vat lieu khoi (polymer, gom su, kim loai). Vi du: soi nano lai (hybrid nanofibers), khung co-huu co kim loai (MOF). Nhom nay tan dung duoc uu diem cua nhieu loai vat lieu dong thoi.",
        ),

        new Paragraph({ spacing: { before: 100 } }),
        h2("3.2 Phan loai theo so chieu (Pokropivny & Skorokhod, 2007)"),
        makeTable3Col(
          ["Loai", "Mo ta", "Vi du dac trung"],
          [
            [
              "0D (0 chieu)",
              "Hat nano - electron bi giam trong khong gian khong chieu (ca 3 chieu deu < 100 nm)",
              "Quantum dots, hat nano Au, Ag, TiO2",
            ],
            [
              "1D (1 chieu)",
              "Electron di chuyen tu do theo 1 truc (x < 100 nm)",
              "Nanowire, nanorod, nanofiber, nanotube",
            ],
            [
              "2D (2 chieu)",
              "Electron di chuyen theo mat phang xy (z < 100 nm)",
              "Graphene, nanosheet, nanofilm, nanoplatelet",
            ],
            [
              "3D (3 chieu)",
              "Cau truc phuc tap, tat ca cac chieu > 100 nm nhung chua nano bên trong",
              "Bulk nano, nanowire network, urchin-like ZnO",
            ],
          ],
        ),
        new Paragraph({ spacing: { before: 100 } }),

        h2("3.3 Phan loai theo nguon goc"),
        bullet(
          "NMs tu nhien: Hinh thanh trong tu nhien khong co tac dong cua con nguoi (bui vu tru, hat khoang chat trong dat, virus, collagen xuong)",
          0,
        ),
        bullet(
          "NMs tinh co (incidental): Phat sinh ngoai y muon tu hoat dong cong nghiep (khoi xe, lung bui han, dam chay rung)",
          0,
        ),
        bullet(
          "NMs nhan tao (engineered): Duoc thiet ke va tong hop co chu dich voi tinh chat xac dinh cho ung dung mong muon",
          0,
        ),

        pageBreak(),

        // ===================== PHAN IV: CAU TRUC =====================
        h1("IV. CAU TRUC VA SU THAY DOI TINH CHAT"),
        h2("4.1 Hieu ung be mat - Nen tang cua moi dac tinh nano"),
        body(
          "Hieu ung be mat (surface effect) la nen tang giai thich tai sao NMs khac biet voi vat lieu khoi. Khi kich thuoc hat giam, ty le nguyen tu be mat / tong so nguyen tu tang theo ham mu:",
        ),
        body(
          "Doi voi hat cau duong kinh d: Ti le be mat ~ 6/d (tinh theo nm). Hat 10 nm co ~30% nguyen tu be mat; hat 1 nm co ~100% nguyen tu be mat (tat ca la be mat!).",
        ),
        body(
          "Nguyen tu be mat co nang luong du phan tu lon hon, de bi bien tinh va phan ung hon - day la nguon goc cua hoat tinh xuc tac cao, kha nang khang khuan, hoat tinh sinh hoc dac biet cua NMs.",
        ),

        h2("4.2 Hieu ung luong tu (Quantum Confinement Effect)"),
        body(
          "Khi kich thuoc hat nho hon ban kinh Bohr exciton cua vat lieu (vi du ~10 nm cho CdSe), cac muc nang luong bien tu lien tuc sang roi rac. Hien tuong nay dan den:",
        ),
        bullet(
          "Phat xung quang phu thuoc kich thuoc: hat CdSe 2 nm phat xanh luc, 6 nm phat do",
        ),
        bullet(
          "Tang gap thong quang (bandgap) - anh huong den tinh chat quang va dien",
        ),
        bullet("Hien tuong cong huong plasmon be mat (SPR) o kim loai quy"),

        h2("4.3 Su thay doi tinh chat theo thong so nano"),
        makeTable3Col(
          ["Tinh chat", "Xu huong thay doi", "Giai thich co che"],
          [
            [
              "Nhiet do nong chay",
              "GIAM manh (Au: 1064 C -> ~300 C o 2 nm)",
              "Nguyen tu be mat lieu de bi dich chuyen hon",
            ],
            [
              "Hoat tinh xuc tac",
              "TANG manh theo ty le be mat",
              "Dien tich be mat / the tich lon => nhieu vi tri hoat dong xuc tac",
            ],
            [
              "Do cung (hardness)",
              "TANG (Hall-Petch effect)",
              "Bien gioi hat nho can tro su truot lech",
            ],
            [
              "Dan dien",
              "Co the TANG hoac GIAM (phu thuoc vat lieu)",
              "Luong tu hoa muc nang luong; tan xa be mat tang",
            ],
            [
              "Tinh chat quang",
              "BIEN DOI sau sac (mau sac, huong quang)",
              "Hieu ung giam can luong tu; SPR o kim loai",
            ],
            [
              "Tu tinh",
              "Xuat hien sieu tu (superparamagnetism) o <20 nm",
              "Bien mien tu thanh don mien; dieu chinh nhiet tu",
            ],
            [
              "Do hoa tan",
              "TANG",
              "Nang luong Gibbs be mat lon; hieu ung Kelvin",
            ],
            [
              "Do phan ung (reactivity)",
              "TANG manh",
              "Nhieu nguyen tu be mat co nang luong cao hon",
            ],
          ],
        ),
        new Paragraph({ spacing: { before: 100 } }),

        h2("4.4 Bien gioi hat (Grain Boundary) - Khai niem Gleiter"),
        body(
          "Theo phan loai cua Gleiter, tinh chat NMs phu thuoc manh vao bien gioi hat. Trong vat lieu nano, mat do bien gioi hat rat lon (co the chiem 30-50% the tich tong). Bien gioi hat co cau truc bat trat tu hon tham so nguyen tu - anh huong den:",
        ),
        bullet(
          "Khuyech tan (diffusion): Tang manh do bien gioi hat la con duong khuyech tan uu tien",
        ),
        bullet(
          "Do ben: Tang (ngan can truot lech) nhung co the giam khi hat qua nho (inverse Hall-Petch)",
        ),
        bullet(
          "Tinh chat dien tu: Tang mat do tran xa lam giam do dan dien mang",
        ),

        pageBreak(),

        // ===================== PHAN V: PHUONG PHAP CHE TAO =====================
        h1("V. CAC PHUONG PHAP CHE TAO"),
        body(
          "Co 3 nhom phuong phap che tao chinh, chia theo 2 chien luoc: Top-down (tu tren xuong - phan nho vat lieu khoi) va Bottom-up (tu duoi len - xay dung tu nguyen tu / phan tu).",
        ),
        makeTable3Col(
          ["Nhom PP", "Chien luoc", "Uu diem chinh"],
          [
            [
              "Vat ly",
              "Chu yeu Top-down",
              "Don gian, khong dung hoa chat doc, san pham sach",
            ],
            [
              "Hoa hoc",
              "Chu yeu Bottom-up",
              "Kich thuoc dong deu, co the chuc nang hoa be mat",
            ],
            [
              "Sinh hoc",
              "Bottom-up (tu nhien)",
              "Xanh, tuong hop sinh hoc, an toan",
            ],
          ],
        ),
        new Paragraph({ spacing: { before: 120 } }),

        // ===== 5.1 PHUONG PHAP VAT LY =====
        h2("5.1 Phuong phap Vat ly (Physical Methods)"),
        body(
          "Phuong phap vat ly su dung nang luong co hoc, nhiet, quang hoac buc xa de phan nho vat lieu khoi hoac boc hoi va ngung tu lai thanh hat nano. Khong dung dung moi hoa chat nen san pham thong thuong sach va it tap chat.",
        ),

        h3("5.1.1 Nghien co hoc (Mechanical Milling / Ball Milling)"),
        body(
          "Nguyen ly: Vat lieu khoi duoc phan nho bang luc va mo ma cua cac bi thep / gom trong coi nghien quay toc do cao (High Energy Ball Milling - HEBM). Qua trinh xay ra o nhiet do phong (cold welding vs fracturing).",
        ),

        h4("Cac thong so co ban:"),
        bullet(
          "Toc do quay (RPM): 200-2000 vong/phut - anh huong lon den nang luong va kich thuoc san pham",
        ),
        bullet(
          "Ty le bi / vat lieu (BPR): thuong 10:1 den 50:1 - BPR cao -> nang luong cao -> hat nho hon nhanh hon",
        ),
        bullet(
          "Thoi gian nghien: tu vai gio den hang chuc gio - thoi gian dai -> hat nho hon nhung co the tinh luc xuat hien pha moi",
        ),
        bullet("Moi truong bao ve: N2, Ar hoac he nuoc de tranh oxy hoa"),
        bullet(
          "Nhiet do: Ket hop nghien o nhiet do thap (cryo-milling) co the dat hat < 10 nm",
        ),

        h4("Qua trinh vat ly:"),
        body(
          "Giai doan dau: Vat lieu bi bien dang deo, trong luong tang. Giai doan giua: Van nut gay gay va hai tron, kich thuoc giam manh. Giai doan cuoi: Can bang dong giua gay nut va ket dinh nguoi (cold welding), kich thuoc dat on dinh.",
        ),

        h4("Uu va nhuoc diem:"),
        bullet(
          "Uu: Chi phi thap, nang suat cao, co the che tao hop kim kho tan; phu hop vat lieu gion",
        ),
        bullet(
          "Nhuoc: Phan bo kich thuoc rong; nhiem tap chat tu bi nghien; kho dat < 20 nm; kho kiem soat hinh dang",
        ),

        new Paragraph({ spacing: { before: 80 } }),
        h3(
          "5.1.2 Boc hoi - Ngung tu pha khi (Physical Vapor Deposition - PVD / Inert Gas Condensation)",
        ),
        body(
          "Nguyen ly: Vat lieu khoi duoc nung nong den nhiet do boc hoi trong buong chan khong hoac trong khi trung tinh (He, Ar). Hoi vat lieu khuyech tan, va cham voi khi trung tinh, mat nang luong va ngung tu thanh hat nano. Phuong phap nay duoc Gleiter phat trien nam 1984 - dat moc lich su trong khoa hoc nano.",
        ),

        h4("Cac bien the chinh:"),
        bullet(
          "Boc hoi nhiet (Thermal evaporation): Dung cuong den dien tro hoac cuong den chum electron nung nong vat lieu",
        ),
        bullet(
          "Boc hoi ho quang (Arc Evaporation): Su dung phong dien ho quang de boc hoi vat lieu dien cuc - dung cho vat lieu nhiet do chay cao (W, Mo, C)",
        ),
        bullet(
          "Phun xa cao tan (RF/DC Sputtering): Ion Ar+ bom pha vao bia (target) vat lieu, boc hoi nguyen tu bia - kiem soat chinh xac hon",
        ),

        h4("Cac thong so anh huong:"),
        bullet(
          "Ap suat khi trung tinh (0.1 - 10 mbar): Tang ap suat -> tang va cham -> hat to hon; giam ap suat -> it va cham -> hat nho hon",
        ),
        bullet(
          "Nhiet do vung ngung tu: Giam nhiet do -> hat nho; tang nhiet do -> hat to (Ostwald ripening)",
        ),
        bullet(
          "Toc do boc hoi: Tang toc do -> mat do hat cao -> de ket tu; giam toc do -> hat dong deu hon",
        ),
        bullet(
          "Loai khi mang (carrier gas): He -> hat nho hon Ar do ma sat nhot cao hon",
        ),

        h4("Uu va nhuoc diem:"),
        bullet(
          "Uu: San pham sach, do tien khiet cao; kiem soat kich thuoc tot; phu hop nghien cuu co ban",
        ),
        bullet(
          "Nhuoc: Nang suat thap; thiet bi dat tien; kho scale-up cho san xuat lon",
        ),

        new Paragraph({ spacing: { before: 80 } }),
        h3(
          "5.1.3 Boc hoi Laser xung (Pulsed Laser Deposition - PLD / Laser Ablation)",
        ),
        body(
          "Nguyen ly: Xung laser cong suat cao (Nd:YAG, KrF excimer) duoc chieu vao be mat vat lieu bia (target) trong buong chan khong. Nang luong laser cuc lon (10^7 - 10^10 W/cm2) lam boc hoi tuc thoi mot the tich nho vat lieu, tao ra plume plasma cao nhiet. Plume nay ngung tu tren de (substrate) hoac trong khi trung tinh thanh hat nano.",
        ),

        h4("Cac thong so co ban:"),
        bullet(
          "Buoc song laser (wavelength): 193 nm (ArF), 248 nm (KrF), 355/532/1064 nm (Nd:YAG). Buoc song ngan -> hap thu tot hon, boc hoi hieu qua hon",
        ),
        bullet(
          "Mat do nang luong xung (fluence, J/cm2): Thong so quan trong nhat. > nguong nguong (threshold) -> boc hoi khoang (ablation); duoi nguong -> chi co hieu ung nhiet; tang fluence -> tang toc do boc hoi -> hat to hon",
        ),
        bullet(
          "Tan so xung (Hz): 1-100 Hz - tang tan so -> tang toc do lan vat lieu nhung giam thoi gian plume nguoi",
        ),
        bullet(
          "Ap suat khinen: O2 (tong hop oxit), N2 (nitride), Ar (trung tinh). Tang ap suat -> hat to hon do va cham plume",
        ),
        bullet(
          "Khoang cach bia - de: Thuong 3-10 cm; gan -> mat do hat cao hon; xa -> hat phan bo deu hon",
        ),

        h4("Cac buoc trong PLD:"),
        body(
          "Pha 1 - Hap thu laser: Nang luong laser duoc hap thu vao vat lieu bia trong thoi gian cuc ngan (~ns). Pha 2 - Boc hoi va tao plume: Vat lieu boc hoi hinh thanh plume dang non sang ngoai de. Pha 3 - Tuong tac plume-khi: Plume va cham khi nen, mat nang luong, bat dau ngung tu. Pha 4 - Ngung tu tren de: Hinh thanh mam tinh the (nucleation) roi phat trien.",
        ),

        h4("Uu diem noi bat cua PLD:"),
        bullet(
          "Giu duoc hop thuc hoa hoc cua bia (stoichiometry transfer) - rat quy gia voi hop chat phuc tap",
        ),
        bullet(
          "Co the tao mang mong nano voi do day rat chinh xac (den tung lop nguyen tu)",
        ),
        bullet(
          "Linh hoat: Co the lam viec voi nhieu loai vat lieu (oxit, nitride, carbon, sinh hoc...)",
        ),
        bullet(
          "In situ doping: Dua tap chat chinh xac bang cach co bia hop kim",
        ),

        new Paragraph({ spacing: { before: 80 } }),
        h3("5.1.4 Phun xuong Ion (Ion Sputtering / Magnetron Sputtering)"),
        body(
          "Nguyen ly: Ion Ar+ duoc gia toc trong dien truong cao ap, bom pha vao be mat bia vat lieu. Dong nang luong va cham day nguyen tu bia ra ngoai (boc hoi vat ly). Trong magnetron sputtering, tu truong giam toc do electron lam tang mat do ion va nang cao hieu suat.",
        ),

        h4("Cac thong so quan trong:"),
        bullet(
          "Cong suat (power, W): Tang cong suat -> tang toc do boc hoi -> hat to hon hoac mang day hon",
        ),
        bullet(
          "Ap suat Ar (0.1-100 mTorr): Anh huong den duong di tu do cua phan tu - dieu chinh mat do va chat luong mang",
        ),
        bullet(
          "Nhiet do de (substrate temperature): Tang nhiet do -> nguyen tu co do linh dong cao hon -> tinh the hoa tot hon, hat to hon",
        ),
        bullet(
          "Thiet ke tu truong: Cau hinh tu truong anh huong manh den su dong deu cua mang lan",
        ),

        pageBreak(),

        // ===== 5.2 PHUONG PHAP HOA HOC =====
        h2("5.2 Phuong phap Hoa hoc (Chemical Methods)"),
        body(
          "Phuong phap hoa hoc dua tren phan ung hoa hoc de tao ra hat nano tu ion / phan tu trong dung dich hoac pha khi. Day la nhom phuong phap pho bien nhat trong nghien cuu va san xuat NMs nho kha nang kiem soat kich thuoc va hinh dang tot.",
        ),

        h3("5.2.1 Khu hoa hoc (Chemical Reduction)"),
        body(
          "Nguyen ly: Su dung chat khu (reducing agent) chuyen ion kim loai (Mn+) thanh nguyen tu kim loai (M0). Nguyen tu tu tap hop (nucleation) roi phat trien thanh hat nano (growth). Quan ly cac giai doan nay quyet dinh kich thuoc va hinh dang hat cuoi cung.",
        ),

        h4("Vi du dien hinh - Tong hop Au NPs:"),
        body(
          "Phuong phap Turkevich (1951): HAuCl4 + Sodium citrate (chat khu + chat on dinh) -> Au NPs ~15-20 nm hinh cau. Phuong phap Brust-Schiffrin: Dung NaBH4 lam chat khu -> hat nho hon (1-5 nm) va on dinh hon trong dung moi huu co.",
        ),

        h4("Cac thong so anh huong:"),
        bullet(
          "Nong do chat khu / ion kim loai: Ty le nay quyet dinh so luong mam (nuclei) ban dau - ty le cao -> hat nho; ty le thap -> hat to",
        ),
        bullet(
          "Nhiet do phan ung: Cao -> toc do khu lon -> nhieu mam -> hat nho; thap -> it mam -> hat to hon",
        ),
        bullet(
          "pH dung dich: Anh huong den dien tich be mat, tinh on dinh keo, va toc do phan ung",
        ),
        bullet(
          "Chat on dinh (stabilizer/capping agent): Citrate, PVP, CTAB, thiol... Nong do on dinh -> kich thuoc nho hon, phan bo hep hon",
        ),
        bullet(
          "Toc do them chat khu: Them nhanh -> nhieu mam cung luc -> hat nho va dong deu",
        ),

        new Paragraph({ spacing: { before: 80 } }),
        h3("5.2.2 Keo tu Sol-Gel"),
        body(
          "Nguyen ly: Chat tien chat (precursor) - thuong la alkoxide kim loai [M(OR)n] - thuy phan va ngung tu trong dung moi hinh thanh gel. Gel sau do duoc say kho (xerogel) hoac say sieu toi han (aerogel) de tao vat lieu nano xop.",
        ),
        body(
          "Phan ung co ban: M(OR)n + H2O -> M(OH)n + nROH [Thuy phan]. Tiep theo la: M(OH)n -> MOn/2 + n/2 H2O [Ngung tu].",
        ),

        h4("Cac thong so chinh:"),
        bullet(
          "Ty le H2O / precursor (R): R < 1 -> uu the ngung tu chieu; R > 4 -> uu the thuy phan -> gel xop",
        ),
        bullet(
          "pH: Moi truong acid -> keo chat, vat lieu si; moi truong kieu -> keo xop hon",
        ),
        bullet(
          "Toc do thuy phan: Dieu chinh bang xuc tac acid/base hoac nhiet do",
        ),
        bullet(
          "Nhiet do nung (calcination): Quyet dinh pha tinh the va kich thuoc hat cuoi cung",
        ),
        bullet(
          "Chat phu gia (template): SBA-15, MCM-41 lam khuon de tao vat lieu xop trat tu",
        ),

        new Paragraph({ spacing: { before: 80 } }),
        h3("5.2.3 Lang dong hoi hoa hoc (Chemical Vapor Deposition - CVD)"),
        body(
          "Nguyen ly: Chat tien chat o the khi duoc dan vao buong phan ung nhiet do cao. Phan ung nhiet phan / oxy hoa tao ra san pham ran lan len de. CVD la phuong phap chinh tao CNT, graphene, va nhieu vat lieu nano tinh khiet.",
        ),
        body(
          "Vi du tong hop CNT: CH4 + H2 -> CNT (tren de SiO2/Co hoac Fe) o 700-1000 C.",
        ),

        h4("Bien the phuong phap:"),
        bullet(
          "Thermal CVD: Nhiet do cao (600-1200 C); don gian; phu hop SiC, Si NWs, CNT",
        ),
        bullet(
          "Plasma-Enhanced CVD (PECVD): Nhiet do thap hon nho plasma; phu hop de nhay cam nhiet",
        ),
        bullet(
          "Metal-Organic CVD (MOCVD): Dung precursor co-kim loai; chinh xac cho vat lieu ban dan",
        ),
        bullet(
          "Atomic Layer Deposition (ALD): Lan luot dua precursor de tao mang 1 lop nguyen tu / chu ky - do chinh xac cao nhat",
        ),

        h4("Thong so anh huong:"),
        bullet(
          "Nhiet do: Anh huong manh den pha san pham, kich thuoc hat xuc tac, toc do phat trien",
        ),
        bullet(
          "Ty le luong khi: H2/CH4 trong tong hop CNT quyet dinh duong kinh ong",
        ),
        bullet(
          "Xuc tac (Fe, Ni, Co): Kich thuoc hat xuc tac ~ duong kinh CNT tao thanh",
        ),
        bullet(
          "Ap suat buong: Anh huong den toc do phan ung va chat luong mang",
        ),

        new Paragraph({ spacing: { before: 80 } }),
        h3("5.2.4 Phan ung thuy nhiet (Hydrothermal / Solvothermal Synthesis)"),
        body(
          "Nguyen ly: Phan ung hoa hoc xay ra trong binh kin (autoclave) o nhiet do va ap suat cao hon binh thuong (200-400 C, 10-100 atm). Moi truong khe cuong lam tang dong nang va do hoa tan cua chat, cho phep tao pha tinh the that su o nhiet do thap hon nhieu so voi nung sinter thong thuong.",
        ),

        h4("Thong so co ban:"),
        bullet(
          "Nhiet do: Thong so quan trong nhat - anh huong den giai doan tao mam, phat trien tinh the va hinh thai hat",
        ),
        bullet(
          "Thoi gian phan ung: Dai hon -> hat lon hon va tinh the hoa tot hon; ngan -> hat nho hon, dang vo dinh hinh",
        ),
        bullet(
          "pH: Quyet dinh dien tich be mat, tinh on dinh, va huong phat trien uu the tinh the",
        ),
        bullet(
          "Chat dinh huong cau truc (SDA): CTAB, PEG, ure -> dinh huong hinh dang hat",
        ),
        bullet(
          "Ap suat (tu tao ra boi nhiet do + khong gian bi): Anh huong den tan suat phan ung pha nuoc sieu toi han",
        ),

        pageBreak(),

        // ===== 5.3 PHUONG PHAP SINH HOC =====
        h2("5.3 Phuong phap Sinh hoc (Green / Biological Synthesis)"),
        body(
          "Tong hop sinh hoc (biosynthesis) hay tong hop xanh (green synthesis) la huong nghien cuu dang len manh nhat trong 10 nam qua. Su dung sinh vat song hoac chiet xuat sinh hoc thay the hoa chat doc hai. Ket qua la quy trinh than thien moi truong, tu nhien, chi phi thap va san pham tuong hop sinh hoc cao.",
        ),

        h3("5.3.1 Tong hop tu vi khuan (Bacteria-Mediated Synthesis)"),
        body(
          "Vi khuan co kha nang khu ion kim loai doc hai thanh dang kim loai it doc hon de bao ve ban than. Pseudomonas stutzeri A259 la vi khuan dau tien duoc dung de tao Ag NPs. Ve sau, nhieu chung vi khuan khac duoc phat hien co kha nang tao Au, Cu, ZnO, Fe3O4 NPs.",
        ),
        body(
          "Vi du dac biet: Vi khuan tu duong (magnetotactic bacteria) tu tao ra hat Fe3O4 sieu tu ~50 nm voi do trat tu pha tinh the cuc cao - khong phuong phap nhan tao nao dat duoc. Chung dung cac hat nay nhu la kim chi nam sinh hoc de huong theo tu truong Trai Dat.",
        ),

        h4("Co che tong hop:"),
        bullet(
          "Ngoai bao (extracellular): Enzyme trong moi truong nuoi cay khu ion kim loai o ngoai te bao",
        ),
        bullet(
          "Noi bao (intracellular): Ion kim loai xam nhap vao te bao, bi khu ben trong va tich luy thanh hat nano",
        ),

        h3("5.3.2 Tong hop tu chiet xuat thuc vat"),
        body(
          "Chiet xuat tu la cay, cu qua, vo cay, hat giong chua phong phu polyphenol, flavonoid, alkaloid - vua la chat khu, vua la chat on dinh tu nhien. Day la phuong phap don gian, kinh te nhat: hoa tan muoi kim loai vao chiet xuat -> hat nano hinh thanh trong vai phut den vai gio o nhiet do phong.",
        ),

        h4("Thong so anh huong:"),
        bullet(
          "Loai thuc vat: Khac nhau ve thanh phan chiet xuat -> khac nhau ve kich thuoc, hinh dang NPs",
        ),
        bullet(
          "Nong do chiet xuat: Cao -> nhieu chat khu/on dinh -> hat nho, on dinh hon",
        ),
        bullet("Nong do muoi kim loai: Anh huong den so mam tao thanh"),
        bullet(
          "Nhiet do: Tang nhiet do tang toc do phan ung, thuong cho hat nho hon",
        ),
        bullet("pH: Anh huong den dien tich be mat va on dinh keo"),

        h3("5.3.3 Tong hop tu nam / men (Fungi & Yeast)"),
        body(
          "Nam (Fusarium oxysporum, Verticillium sp.) chua nhieu enzyme ngoai bao co kha nang khu ion kim loai. Uu diem lon so voi vi khuan: nam de nuoi cay o quy mo lon hon, tiet ra nhieu enzyme hon, co the tao NPs o ca be mat va ngoai moi truong nuoi cay. Men Candida glabrata duoc bao cao tong hop CdS quantum dots tu nhien.",
        ),

        pageBreak(),

        // ===================== PHAN VI: TAC DONG THONG SO =====================
        h1("VI. TAC DONG TOAN THE CUA CAC THONG SO CHE TAO"),
        h2("6.1 Bang tom tat thong so va tac dong"),
        makeTable3Col(
          ["Thong so", "Xu huong", "Giai thich"],
          [
            [
              "Nhiet do phan ung",
              "Tang -> hat to hon (Bottom-up)",
              "Tang do linh dong be mat; Ostwald ripening nhanh hon",
            ],
            [
              "Nong do tien chat",
              "Tang -> nhieu mam -> hat nho hon (ban dau)",
              "Nhieu mam dong thoi = khong gian phat trien it hon",
            ],
            [
              "Nong do chat on dinh",
              "Tang -> hat nho, on dinh hon",
              "Bao phu be mat ngan ket tu",
            ],
            [
              "Thoi gian phan ung",
              "Dai -> hat to, tinh the hoa tot",
              "Qua trinh chin muoi (Ostwald ripening)",
            ],
            [
              "pH dung dich",
              "Anh huong phuc tap tuy vat lieu",
              "Thay doi dien tich be mat, kha nang on dinh keo",
            ],
            [
              "Toc do them chat khu",
              "Nhanh -> nhieu mam -> hat nho",
              "Nucleation burst tao nhieu mam cung luc",
            ],
            [
              "Ap suat khi (PVD)",
              "Tang -> hat to (nhieu va cham)",
              "Va cham lam cham hat nano trong phase khi",
            ],
            [
              "Nang luong laser (PLD)",
              "Tang -> boc hoi nhieu -> tan so dep loi lat -> hat to hon",
              "Thay doi toc do nucleation va phat trien",
            ],
            [
              "Toc do xay (ball milling)",
              "Tang -> hat nho hon nhanh",
              "Nang luong va cham lon hon",
            ],
            [
              "Nhiet do de (CVD/PVD)",
              "Tang -> hat to, tinh the hoa tot",
              "Tang do linh dong cua nguyen tu tren be mat",
            ],
          ],
        ),
        new Paragraph({ spacing: { before: 100 } }),

        h2("6.2 Ket qua nam tinh chat NMs - Rui ro va thach thuc"),
        makeTable2Col(
          ["Dac tinh NMs", "Rui ro / Thach thuc"],
          [
            [
              "Ket tu / Keo tu (Agglomeration)",
              "Giam do ben an mon, tang do hoa tan, bien doi pha -> kho bao quan va van chuyen",
            ],
            [
              "Dien tich / Doan (Charge)",
              "Nhom chuc nang quyet dinh sinh kha dung va doc tinh sinh hoc",
            ],
            [
              "Tap chat (Impurity)",
              "Ion ngoai y muon anh huong ket qua sinh hoc; can bao goi kin",
            ],
            [
              "Kich thuoc that su",
              "Kho giu nguyen kich thuoc sau tong hop; bat buoc bao goi (encapsulation)",
            ],
            [
              "Hinh dang (Shape)",
              "Anh huong doc tinh; soi dai > 10 um gay ung thu phoi (asbestos)",
            ],
            [
              "Tai che / Thai bo",
              "Chua co quy dinh quoc te thong nhat; nguy co o nhiem long hanh tinh lau dai",
            ],
          ],
        ),
        new Paragraph({ spacing: { before: 100 } }),

        pageBreak(),

        // ===================== PHAN VII: KET LUAN VA UNG DUNG =====================
        h1("VII. KET LUAN VA UNG DUNG"),
        h2("7.1 Ung dung trong Y sinh hoc va Duoc pham"),
        body(
          "Day la linh vuc ung dung an tuong va co tac dong lon nhat cua NMs. Su kết hop giua kich thuoc nano, be mat lap the chuc nang hoa va tinh chat dac biet tao ra the he thuoc va thiet bi y te hoan toan moi:",
        ),
        bullet(
          "Dan truyen thuoc co chon loc (Targeted Drug Delivery): Hat nano polymer (PLGA), liposome, quantum dot mang thuoc chong ung thu den dung khoi u, giam tac dung phu toan than",
        ),
        bullet(
          "Chan doan hinh anh: Fe3O4 NPs sieu tu lam chat tuong phan MRI; quantum dots cho phat xa huong quang chon loc trong nhuom te bao",
        ),
        bullet(
          "Lieu phap nhiet tu (Magnetic Hyperthermia): Hat Fe3O4 trong tu truong xoay chieu toa nhiet de diet te bao ung thu",
        ),
        bullet(
          "San pham dau tien: Abraxane(TM) (2005) - albumin NPs chua paclitaxel - FDA chap thuan tri ung thu vu va phoi",
        ),
        bullet(
          "Khang khuan: Ag NPs diet khuan hieu qua ca voi chung khang khang sinh; dung trong bang vet thuong, san pham ve sinh",
        ),

        h2("7.2 Ung dung trong Nang luong va Moi truong"),
        bullet(
          "Pin mat troi: TiO2 NPs trong pin mat troi nhay mau (DSSC) cua Gratzel; QDs tang hieu suat hap thu anh sang rong hon",
        ),
        bullet(
          "Pin luu tru: NMs LiFePO4 cho pin Li-ion; graphene tang dan dien dien cuc; thoi gian nap nhanh hon",
        ),
        bullet(
          "Xuc tac xu ly o nhiem: TiO2 NPs xuc tac quang phan huy chat o nhiem huu co; Au NPs xuc tac CO oxy hoa nhiet do phong",
        ),
        bullet(
          "Loc nuoc: Mang nano loc kim loai nang; TiO2 xu ly nuoc bang anh sang mat troi",
        ),

        h2("7.3 Ung dung trong Cong nghiep va Vat lieu"),
        bullet(
          "Vat lieu composite: CNT, graphene tang do ben / dan dien; nano SiO2 tang do ben cao su",
        ),
        bullet(
          "Lop phu bao ve: Nano TiO2/ZnO trong son chong UV, chong ao; lop phu nano chong tram xuoc (Mercedes-Benz 2003)",
        ),
        bullet(
          "Dien tu: Mach vi xu ly silicon nano; mang dan dien trong (ITO) cho man hinh cam ung",
        ),
        bullet(
          "Det may / Thoi trang: Ag NPs chong mui hoi trong vai; nano TiO2 lam sach tu dong",
        ),
        bullet(
          "Thuc pham: Bao bi nano chong oxy hoa; cam bien an toan thuc pham (phat hien vi khuan)",
        ),

        h2("7.4 Quy dinh phap ly va An toan"),
        body(
          "Tuy co nhieu ung dung tiem nang, NMs cung dat ra cac lo ngai nghiem trong ve an toan. Quy trinh danh gia rui ro va quy dinh phap ly la tat yeu:",
        ),
        bullet(
          "My (FDA, EPA): Dang xay dung khung phap ly; FDA danh gia NMs trong duoc pham, my pham tung truong hop",
        ),
        bullet(
          "Lien minh Chau Au: Co he thong quy dinh toan dien nhat; dinh nghia NMs trong EU Cosmetics Regulation 1223/2009; REACH ap dung cho NMs hoa chat",
        ),
        bullet(
          "Doc tinh: NMs co the vuot qua hang rao sinh ly; gay stress oxy hoa, viem, ton thuong DNA - phu thuoc manh vao kich thuoc, hinh dang, thanh phan va lieu luong",
        ),
        bullet(
          "Nguyen tac phong ngua: Chua du du lieu doc tinh dai han; can nghien cuu nanotoxicology toan dien truoc khi cho dung rong rai",
        ),

        h2("7.5 Kết luan"),
        body(
          "Vat lieu nano va cau truc nano la nen tang cua cong nghe tuong lai. Tu lich su hon 4.500 nam su dung vo tinh den trinh do che tao co kiem soat hoan toan ngay nay, nhan loai da di mot chang duong dai de hieu biet va khai thac khoang khong gian nano ky dieu.",
        ),
        body(
          "Diem mau chot rut ra tu bao cao nay: (1) Lich su cho thay con nguoi luon ban nang song voi NMs; (2) Tieu chi phan loai da dang giup du bao va kiem soat tinh chat; (3) Moi phuong phap che tao co uu nhuoc diem rieng - khong co phuong phap nao la van nang; (4) Cac thong so che tao anh huong truc tiep va sau sac den tinh chat cuoi cung cua NMs; (5) Ung dung rat rong nhung rui ro doc tinh can duoc nghien cuu ky luong.",
        ),
        body(
          "Huong nghien cuu tuong lai: Phuong phap tong hop xanh (green synthesis) de giam tac dong moi truong; NMs tuong hop sinh hoc the he moi cho y sinh hoc chinh xac; cong nghe nano tu lap rap (self-assembly) dieu khien duoc; va cuoi cung la viec xay dung bo tieu chuan quoc te thong nhat cho dinh nghia, kiem thu va quy dinh NMs.",
        ),

        new Paragraph({
          spacing: { before: 200 },
          alignment: AlignmentType.CENTER,
          border: {
            top: {
              style: BorderStyle.SINGLE,
              size: 6,
              color: BLUE_MED,
              space: 4,
            },
          },
          children: [
            new TextRun({
              text: "--- Het bao cao ---",
              size: 20,
              italics: true,
              color: "888888",
              font: "Arial",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 60 },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Nguon tham khao chinh: Jeevanandam et al., Beilstein J. Nanotechnol. 2018, 9, 1050-1074. doi:10.3762/bjnano.9.98",
              size: 18,
              italics: true,
              color: "888888",
              font: "Arial",
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("/mnt/user-data/outputs/BaoCao_VatLieuNano.docx", buf);
  console.log("Done!");
});
