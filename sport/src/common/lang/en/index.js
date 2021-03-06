import login from './login'
import mywallet from './mywallet'
import mysale from './mysale'
import password from './password'
import VIPCenter from './vipCenter'
import userInfo from './userInfo'
import org from './org'
import share from './share'

const ln = {
  common: {
    Login: 'Login',
    transaction: 'Transfer',
    back: 'Back',
    ok: 'OK',
    submit: 'Submit',
    cancel: 'Cancel',
    confirm: 'Confirm',
    Enter: 'Enter',
    query: 'Query',
    search: 'Search',
    by: 'By',
    MemberAccount: 'Member account',
    ComingSoon: 'Coming soon',
    NoData: 'Temporarily no data'
  },
  errors: {
    safecode: {
      required: 'Security code cannot be empty',
      verifyFailed: 'Security code input error'
    },
    email: {
      required: 'Mailbox cannot be empty',
      email: 'Incorrect email format',
      confirmEmail:'两次输入邮箱不一致'
    }
  },
  securityCode: {
    title: 'Security Code',
    placeholder: 'Please fill in the security code'
  },
  FootNav: {
    vip: 'VIP zone',
    org: 'Organizational structure',
    mysale: 'My sales',
    tradecenter: 'ransaction',
    mywallet: 'My wallet'
  },
  MembershipGrade: {
    Regular: 'Regular membership'
  },
  login: login,
  mywallet: mywallet,
  mysale: mysale,
  password: password,
  vip: VIPCenter,
  userInfo: userInfo,
  org: org,
  share:share
}
export default ln
