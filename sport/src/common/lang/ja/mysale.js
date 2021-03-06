const ln = {
  mysale: '売り出し',
  RegisterParentAccount: '親アカウントを登録する',
  RegisterSubsidiaryAccount: '子アカウントを登録します',
  UnbindSubaccount: '子アカウントとの紐付けを解除する',
  BindParentAccount: '親アカウントと紐付けます',
  LeftRegion: '左区',
  RightRegion: '右区',
  RegisterParentAccountPage: {
    fields: {
      MemberAccount: '会員アカウント',
      MemberName: '会員名',
      LoginPassword: 'ログインパスワード',
      ConfirmLoginPassword: 'ログインパスワードをご確認ください',
      SecurityCode: 'セキュリティーコード',
      ConfirmSecurityCode: 'セキュリティーコードをご確認ください',
      MembershipGrade: '会員レベル',
      Referee: '紹介人',
      RefereeDiagram: '推荐図',
      ContactPerson: '接点人',
      ContactDiagram: '接点図',
      MarketPosition: '市場アドレス',
      Email: 'メールアドレス',
      ConfirmEmail:'メールアドレス',
      RegisterCurrencyBalance: 'USDT残高'
    },
    placeholder: {
      MemberAccount: '5-18字のアルファベット、数字をご入力ください......',
      MemberName: 'Only 2-16 characters are allowed......',
      LoginPassword: '8-16字のアルファベット、数字をご入力ください......',
      ConfirmLoginPassword: 'Same as the login password......',
      SecurityCode: '8-16字のアルファベット、数字をご入力ください......',
      ConfirmSecurityCode: 'Same as the login security code......',
      MembershipGrade: '会员级别',
      Referee: '紹介人',
      RefereeDiagram: '推荐图',
      ContactPerson: '接点人',
      ContactDiagram: '接点图',
      MarketPosition: '市场位置',
      Email: 'メールアドレスをご入力ください',
      ConfirmEmail:'メールアドレスを再度入力します',
      RegisterCurrencyBalance: '注册币余额'
    },
    errors: {
      account: {
        required: 'Member account cannot be empty',
        enOrNumber: 'Only English or numbers are allowed',
        size: 'Only 5-18 bits of English or Numbers are allowed'
      },
      nickname: {
        cnOrEn: 'Only 2-16 bits of English or Chinese characters are allowed',
        size: 'Only 2-16 bits of English or Chinese characters are allowed'
      },
      pwd: {
        required: 'Password cannot be empty',
        enOrNumber: 'Only 8-16 bits of English or NUmbers are allowed',
        size: 'Only 8-16 bits of English or NUmbers are allowed',
        sameWithSafepwd: 'The login password an security code cannot be the same',
        repeat: 'The two passwords are different'
      },
      safepwd: {
        required: 'Security code cannot be empty',
        enOrNumber: 'Only 8-16 bits of English or NUmbers are allowed',
        size: 'Only 8-16 bits of English or NUmbers are allowed',
        repeat: 'The two input security codes are different'
      }
    },
    alert: '注意：登録するには10USDTがかかります'
  }
}

export default ln
