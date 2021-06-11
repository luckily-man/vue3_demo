
// 常用的正则规则
export const regExpConfig = {
  numValidate: /[0-9]/,
  lowerValidate: /[a-z]/,
  upperValidate: /[A-Z]/,
  specialValidate: /[\W]/,

  twoBaseValidate: /[0-1]/,
  // 匹配8~30个字符 小写字母
  singlePwdValidateLowerCase830: /^[a-z]{8,30}$/,
  // 匹配8~30个字符 大写字母
  singlePwdValidateUpperCase830: /^[A-Z]{8,30}$/,
  // 匹配8~30个字符 数字
  singlePwdValidateNum830: /^[0-9]{8,30}$/,
  // 匹配9~16个字符 数字
  singlePwdValidateNum916: /^[0-9]{9,16}$/,
  // 匹配8~30个 特殊字符
  singlePwdValidateSpecial830: /^[~!@#$%^&*?_-]{8,30}$/,

  // 匹配8~30个字符 大小写字母
  doublePwdValidateLowerUpperCase830: /^(?![a-z]+$)[a-zA-Z]{8,30}$/,
  // 匹配8~30个字符 大写字母+数字
  doublePwdValidateUpperCaseNum830: /^(?![0-9]+$)[A-Z0-9]{8,30}$/,
  // 匹配8~30个字符 小写字母+数字
  doublePwdValidateLowerCaseNum830: /^(?![0-9]+$)[a-z0-9]{8,30}$/,
  // 匹配8~30个字符 小写字母+特殊符号
  doublePwdValidateLowerCaseSpecial830: /^(?![a-z]+$)[a-z~!@#$%^&*?_-]{8,30}$/,
  // 匹配8~30个字符 大写字母+特殊符号
  doublePwdValidateUpperCaseSpecial830: /^(?![A-Z]+$)[A-Z~!@#$%^&*?_-]{8,30}$/,
  // 匹配8~30个字符 数字+特殊符号
  doublePwdValidateNumSpecial830: /^(?![0-9]+$)[0-9~!@#$%^&*?_-]{8,30}$/,

  // 匹配8~30个字符 大小写字母+数字
  threePwdValidateLowerUpperCaseNum830: /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{8,30}$/,
  // 匹配8~30个字符 大小字母+特殊符号
  threePwdValidateLowerUpperCaseSpecial830: /^(?![a-zA-Z]+$)[a-zA-Z~!@#$%^&*?_-]{8,30}$/,
  // 匹配8~30个字符 大写字母+特殊符号+数字
  threePwdValidateUpperCaseNumSpecial830: /^(?![0-9A-Z]+$)[A-Z0-9~!@#$%^&*?_-]{8,30}$/,
  // 匹配8~30个字符 小写字母+特殊符号+数字
  threePwdValidateLowerCaseNumSpecial830: /^(?![0-9a-z]+$)[a-z0-9~!@#$%^&*?_-]{8,30}$/,

  // 匹配8~30个字符 大小字母+特殊符号+数字
  fullPwdValidateLowerUpperCaseNumSpecial830: /^(?![0-9a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*?_-]{8,30}$/,

  // 匹配6~10个字符 小写字母
  singlePwdValidateLowerCase610: /^[a-z]{6,10}$/,
  // 匹配6~10个字符 大写字母
  singlePwdValidateUpperCase610: /^[A-Z]{6,10}$/,
  // 匹配6~10个字符 数字
  singlePwdValidateNum610: /^[0-9]{6,10}$/,
  // 匹配6~10个 特殊字符
  singlePwdValidateSpecial610: /^[~!@#$%^&*?_-]{6,10}$/,

  // 匹配6~10个字符 大小写字母
  doublePwdValidateLowerUpperCase610: /^(?![a-z]+$)[a-zA-Z]{6,10}$/,
  // 匹配6~10个字符 大写字母+数字
  doublePwdValidateUpperCaseNum610: /^(?![0-9]+$)[A-Z0-9]{6,10}$/,
  // 匹配6~10个字符 小写字母+数字
  doublePwdValidateLowerCaseNum610: /^(?![0-9]+$)[a-z0-9]{6,10}$/,
  // 匹配6~10个字符 小写字母+特殊符号
  doublePwdValidateLowerCaseSpecial610: /^(?![a-z]+$)[a-z~!@#$%^&*?_-]{6,10}$/,
  // 匹配6~10个字符 大写字母+特殊符号
  doublePwdValidateUpperCaseSpecial610: /^(?![A-Z]+$)[A-Z~!@#$%^&*?_-]{6,10}$/,
  // 匹配6~10个字符 数字+特殊符号
  doublePwdValidateNumSpecial610: /^(?![0-9]+$)[0-9~!@#$%^&*?_-]{6,10}$/,

  // 匹配6~10个字符 大小写字母+数字
  threePwdValidateLowerUpperCaseNum610: /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,10}$/,
  // 匹配6~10个字符 大小字母+特殊符号
  threePwdValidateLowerUpperCaseSpecial610: /^(?![a-zA-Z]+$)[a-zA-Z~!@#$%^&*?_-]{6,10}$/,
  // 匹配6~10个字符 大写字母+特殊符号+数字
  threePwdValidateUpperCaseNumSpecial610: /^(?![0-9A-Z]+$)[A-Z0-9~!@#$%^&*?_-]{6,10}$/,
  // 匹配6~10个字符 小写字母+特殊符号+数字
  threePwdValidateLowerCaseNumSpecial610: /^(?![0-9a-z]+$)[a-z0-9~!@#$%^&*?_-]{6,10}$/,

  // 匹配6~10个字符 大小字母+特殊符号+数字
  fullPwdValidateLowerUpperCaseNumSpecial610: /^(?![0-9a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*?_-]{6,10}$/,

  // 邮箱
  emailRegex: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
  // 联系方式
  phoneRegex: /^1[34578]\d{9}$/,
  // 手机号
  regMobile :/^(0|86|17951)?(13[0-9]|15[123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
  //1~255/0~32
  rangeRegex: new RegExp(/^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\/([0-9]|[1-2]\d|3[0-2])$/),
  // network网段验证
  networkRegex: new RegExp(/^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\/([0-9]|[1-2]\d|3[0-2])$/),
  // netmask 1-255
  netmaskRegex: RegExp(/^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/),
  //  0.0.0.0~255.255.255.255
  ipAddressRegex: /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
  // 192.168.2.10,192.168.2.20(0-255)
  dhcpRegex: /^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\,)(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
  // port端口号
  portRegex: /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/,
  // target验证
  targetRegex: /^((iqn)(\.)(\d{4}-((0[1-9])|(1(0|1|2))))(\.)(.*?))$/,
  //单位正则匹配
  numReg: new RegExp(/^([-+]?[0-9]+(\.[0-9]+)?)$/),
  unitsReg: new RegExp(/^([-+]?[0-9]+(\.[0-9]+)?)(b|B|k|K|m|M|g|G|t|T|p|P|e|E|z|Z|y|Y|kb|kB|Kb|KB|kib|KIb|kIb|kiB|KiB|KIB|kIB|Kib|mb|mB|Mb|MB|mib|MIb|mIb|miB|MiB|MIB|mIB|Mib|gb|gB|Gb|GB|gib|GIb|gIb|giB|GiB|GIB|gIB|Gib|tb|tB|Tb|TB|tib|TIb|tIb|tiB|TiB|TIB|tIB|Tib|pb|pB|Pb|PB|pib|PIb|pIb|piB|PiB|PIB|pIB|Pib|eb|eB|Eb|EB|eib|EIb|eIb|eiB|EiB|EIB|eIB|Eib|zb|zB|Zb|ZB|zib|ZIb|zIb|ziB|ZiB|ZIB|zIB|Zib|yb|yB|Yb|YB|yib|YIb|yIb|yiB|YiB|YIB|yIB|Yib)$/),
  bReg: new RegExp(/^([-+]?[0-9]+(\.[0-9]+)?)(b|B)$/),
  kbReg: new RegExp(/^([-+]?[0-9]+(\.[0-9]+)?)(k|K|kb|kB|Kb|KB|kib|KIb|kIb|kiB|KiB|KIB|kIB|Kib)$/),
  mbReg: new RegExp(/^([-+]?[0-9]+(\.[0-9]+)?)(m|M|mb|mB|Mb|MB|mib|MIb|mIb|miB|MiB|MIB|mIB|Mib)$/),
  gbReg: new RegExp(/^([-+]?[0-9]+(\.[0-9]+)?)(g|G|gb|gB|Gb|GB|gib|GIb|gIb|giB|GiB|GIB|gIB|Gib)$/),
  tbReg: new RegExp(/^([-+]?[0-9]+(\.[0-9]+)?)(t|T|tb|tB|Tb|TB|tib|TIb|tIb|tiB|TiB|TIB|tIB|Tib)$/),
  pbReg: new RegExp(/^([-+]?[0-9]+(\.[0-9]+)?)(p|P|pb|pB|Pb|PB|pib|PIb|pIb|piB|PiB|PIB|pIB|Pib)$/),
  ebReg: new RegExp(/^([-+]?[0-9]+(\.[0-9]+)?)(e|E|eb|eB|Eb|EB|eib|EIb|eIb|eiB|EiB|EIB|eIB|Eib)$/),
  zbReg: new RegExp(/^([-+]?[0-9]+(\.[0-9]+)?)(z|Z|zb|zB|Zb|ZB|zib|ZIb|zIb|ziB|ZiB|ZIB|zIB|Zib)$/),
  ybReg: new RegExp(/^([-+]?[0-9]+(\.[0-9]+)?)(y|Y|yb|yB|Yb|YB|yib|YIb|yIb|yiB|YiB|YIB|yIB|Yib)$/),
}
