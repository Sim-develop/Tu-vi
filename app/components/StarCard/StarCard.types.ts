export interface StarCardTypes {
  cungSo: number;
  hanhCung: string;
  cungAmDuong: number;
  cungTen: string;
  cungThan: boolean;
  cungChu: string;
  cungDaiHan: number;
  cungTieuHan: string;
  cungNguyetHan: number;
  cungSao: StarInfoTypes[];
  tuanTrung?: boolean;
  trietLo?: boolean;
}

export interface StarInfoTypes {
  saoID: number;
  saoTen: string;
  saoNguHanh: string;
  saoTot: number;
  saoLoai: number;
  saoPhuongVi: string;
  saoAmDuong: number;
  vongTrangSinh: number;
  cssSao: string;
  saoDacTinh: string;
  inDam: number;
}
