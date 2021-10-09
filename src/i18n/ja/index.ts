import type {BaseTranslation} from 'typesafe-i18n';

const ja: BaseTranslation = {
  Brand: {
    Name: 'henken.club',
  },

  Login: 'ログイン',
  TermOfService: 'サービス利用規約',
  PrivacyPolicy: 'プライバシーポリシー',

  HeaderNav: {
    Accordion: {
      PostsHenkens: '投げた偏見',
      ReceivedHenkens: 'もらった偏見',
      PostsAnswers: 'あなたの回答',
      ReceivedAnswers: '来た返答',
      Settings: '設定',
      SignOut: 'ログアウト',
    },
    NeedRegister: 'ユーザー登録',
  },

  RegisterForm: {
    Title: 'ユーザー登録',
    Description:
      '本サービスの利用にはユーザー登録をする必要がありますが、後ですることも出来ます。',
    Alias: 'エイリアス',
    DisplayName: '表示名',
    Avatar: 'プロフィール画像',
    aria: {
      Alias: 'エイリアス',
      DisplayName: '表示名',
      Avatar: 'プロフィール画像',
    },
    Submit: '登録する',
    Registering: '登録中',
  },
};

export default ja;
