const ln = {
  mywallet: '私の財布',
  coinShouYi: '収益貨幣',
  coinZhuCe: 'Registered currency',
  coinChongGou: '再構成貨幣',
  coinZhongChou: '募金額',
  coinChaiFen: '分割貨幣',
  coinXiaoFei: '消費貨幣',
  balance: '残高',
  ReceivingMemberNumber: '会員番号を受け取る',
  NumberOfPointsTransferredOut: '振込ポイント量',
  ReceivingMemberName:'メンバーの名前を受け取る',
  placeholder: {
    TransferTo: '会員番号を受け取る',
    TransferAmount: '振込ポイント量をご入力ください',
    NiceName: 'メンバー名',
  },
  transfer: {
    errors: {
      'NoReceiveAccount': 'Receive member account does not exist',
      'NoReferAccount': 'The account has no recommended relationship',
      'ReceiveAccountRequired': 'The receiving member cannot be empty',
      'pointsOut': {
        required: 'The number of transfer points cannot be empty',
        positiveInt: 'You can only get positive integers'
      }
    }
  }
}

export default ln
