export interface UserCardTypes {
  gioiTinh: number;
  namNu: string;
  hour: number;
  mins: number;
  chiGioSinh: HourOfBirth;
  canGioSinh: number;
  gioSinh: string;
  timeZone: number;
  today: string;
  ngayDuong: number;
  thangDuong: number;
  namDuong: number;
  ten: string;
  ngayAm: number;
  thangAm: number;
  namAm: number;
  thangNhuan: number;
  canThang: number;
  canNam: number;
  chiNam: number;
  chiThang: number;
  canThangTen: string;
  canNamTen: string;
  canNamXemTen: string;
  namXem: number;
  chiThangTen: string;
  chiNamTen: string;
  chiNamXemTen: string;
  canNgay: number;
  chiNgay: number;
  canNgayTen: string;
  chiNgayTen: string;
  amDuongNamSinh: string;
  amDuongMenh: string;
  hanhCuc: number;
  tenCuc: string;
  menhChu: string;
  thanChu: string;
  menh: string;
  sinhKhac: string;
  banMenh: string;
}

export interface HourOfBirth {
  id: string;
  tenChi: string;
  tenHanh: string;
  menhChu: string;
  thanChu: string;
  amDuong: number;
}
