import type {BaseTranslation} from 'typesafe-i18n';

const ja: BaseTranslation = {
  Brand: {
    Name: 'henken.club',
  },

  Format: {
    Alias: '@{alias:string}',
  },

  Followees: 'フォロイー',
  Followers: 'フォロワー',
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
    Registered: 'ようこそ、{displayName:string}さん！どうぞお楽しみ下さい！',
  },

  SearchBox: {
    aria: {
      SearchInput: '検索ボックス',
    },
    Suggestions: {
      Author: '著者',
      Book: '本',
      BookSeries: '本のシリーズ',
    },
  },

  UserPage: {
    Header: {
      IsFollowed: 'フォローされています',
      CanPostHenken: '偏見を送れます',
    },
    Profile: {
      CannotPostHenken: '偏見を送れません',
      Following: 'フォロー中です',
      Follow: 'フォローする',
      Unfollow: 'フォローを外す',
    },
    UserGrid: {
      More: 'もっと',
    },
  },
};

export default ja;
