export const BASIC_FORM_STRINGS = {
  FORM_TITLE: 'Profile details',
  SUB_TEXT: 'Define your profile details.',
  FORM_NAME: 'BASIC INFORMATION',
};
export const WIFI_FORM_STRINGS = {
  FORM_TITLE: 'WIFI network',
  SUB_TEXT: 'Set WIFI network information.',
  FORM_NAME: 'WIFI NETWORK INFORMATION',
};
export const LEAGAL_AGREE_FORM_STRINGS = {
  FORM_TITLE: 'Legal Agreement',
  SUB_TEXT1: 'Custom Privacy Policy, EULAs and Terms of Service.',
  SUB_TEXT2: "If you don't want to custom this, Click on CONTINUE button.",
  FORM_NAME: 'LEGAL AGREEMENT INFORMATION',
  FORM_SUBTEXT:
    'Add End User License Agreements, Terms of Service, or other user agreements that users must acknowledge before using the device.',
  EULA_CONTENT: 'Custom EULA contents',
};

export const DEVICE_OWNER_FORM_STRINGS = {
  FORM_TITLE: 'Device Owner profile information',
  SUB_TEXT: ' Contact your Device Owner profile for the information.',
  FORM_NAME: 'DEVICE OWNER PROFILE',
  SUB_TEXT2:
    ' Refer to the Profile configuration User Guide for more information on how to configure your Device Owner profile APK.',
};

export const OPTIONAL_CONFIG_FORM_STRINGS = {
  FORM_TITLE: 'Optional configuration',
  SUB_TEXT1:
    'Add device & peripheral configuraiton policy or deploy 2nd application.',
  SUB_TEXT2: 'You can skip this step.',
};

export const SELECT_PROFILE_STRINGS = {
  TITLE: 'Select profile type',
  SUB_TEXT1: 'Create new profile by selecting one of the profile types.',
  SUB_TEXT2: 'Learn more about different profile types.',
};

export const NAME = 'Name';
export const ASTERIX = '*';
export const HIDDEN_NET = 'Hidden network';
export const ADD_HIDDEN_NET = 'Add a hidden network';
export const WIFI_MAC_RAND = 'WIFI MAC address randomization';
export const ON = 'On';
export const OFF = 'Off';
export const PROXY = 'Proxy';
export const PASSWORD = 'Password';
export const ENTER_PASS = 'Enter password';
export const PAC_WEB = 'Pac web address';
export const EXAMPLE_WEB = 'http://www.example.com/';
export const EAP_METHOD = 'EAP method';
export const IDENTITY = 'Identity';
export const PHASE2_AUTH = 'Phase 2 authentication';
export const CA_CERT = 'CA certificate';
export const USER_CERT = 'User certificate';
export const SECURITY = 'Security';
export const CONTINUE = 'CONTINUE';
export const TITLE = 'Title';
export const PROFILE_NAME = 'Profile Name';
export const ORGANIZATION = 'Organization';
export const DESCRIPTION = 'Description';
export const UPLOAD_CERTIFICATION = 'UPLOAD CERTIFICATION ';
export const UPLOAD_CA_FILE = 'UPLOAD CA FILE';
export const UPLOAD_CERTIFICATE_FILE = 'UPLOAD CERTIFICATE FILE';
export const DOP = 'DEVICE OWNER PROFILE';
export const DOP_DESCRIPTION =
  'Enroll a device as Device Owner mode for management by an EMM/MDM. This profile allow you to make network connection and provisioning device owner app.';
export const DCP = 'DEVICE CONFIGURATION PROFILE';
export const DCP_DESCRIPTION =
  "Configure your device settings. With this profile you can customize your device common settings such as display, HW key event action, Sounds as well as essential peripheral settings such as 'pre-fix' text, default connect option.";

export const EMM_CREATE_PAGE_TITLE = 'CREATE NEW PROFILE';

export const DEVICE_AND_PERIPHERAL_CONFIG =
  '1. DEVICE & PERIPHERAL CONFIGURATION';
export const OPTIONAL_CONFIG_TOGGLE_DESCRIPTION =
  "Enable this option when you want to configure device & peripheral settings. For this, you have to generate 'Device & Peripheral profile' in advance. If you want to get more detail information please check";
export const MORE_APP = '2. MORE APPLICATION';
export const ADD_PACKAGE_DESCRIPTION =
  'You can deploy an additional app by adding the package name & download URL. You can add a package.';
export const ADD_NEW_PACKAGE = 'ADD NEW PACKAGE';
export const DNP_GUIDE = " 'Device & Peripheral configuration' guide.";

export const DNP_CONFIGURATION = {
  FIELD1: 'Device & peripheral configuraiton file location',
  FIELD2: 'Knox Service plug-in installation',
  FIELD3: 'Package name',
  FIELD4: 'Package signing key',
};

export const NEW_PACKAGE = {
  FIELD1: 'Package name',
  FIELD2: 'Package signing key',
  FIELD3: 'Package download URL',
};

export const CHOOSE_EMM = 'Choose your EMM';
export const DO_APK = 'Device Owner APK download URL';
export const ADMIN_COMP = 'Admin package component name';
export const ADMIN_SIGN = 'Admin package signature checksum';
export const DO_URI = 'Device owner profile server URI';
export const CUSTOM_JSON =
  'Custom JSON Data (as defined by Device Owner profile)';
export const ROOT_CERT = ' Root/intermediate certificate';
export const CONFIG_PRIVATE_URL = 'Configure private APK host URL';
export const SELECTED_ITEM = 'Selected Item';

export const SUMMARY_FORM_STRINGS = {
  FORM_TITLE: 'Summary',
  SUB_TEXT: 'Check your information.',
  BASIC_INFO_TITLE: 'BASIC INFORMATION',
  BASIC_INFO_FIELD1: 'Profile Name',
  BASIC_INFO_FIELD2: 'Organization',
  BASIC_INFO_FIELD3: 'Description',
  NETWORK_INFO_TITLE: 'NETWORK INFORMATION',
  NETWORK_INFO_FIELD1: 'Name',
  NETWORK_INFO_FIELD2: 'Hidden network',
  NETWORK_INFO_FIELD3: 'WIFI MAC adress randomization',
  NETWORK_INFO_FIELD4: 'Proxy',
  NETWORK_INFO_FIELD5: 'Security',
  NETWORK_INFO_FIELD6: 'EAP method',
  NETWORK_INFO_FIELD7: 'Password',
  NETWORK_INFO_FIELD8: 'Phase 2 authetication',
  NETWORK_INFO_FIELD9: 'CA certificate',
  NETWORK_INFO_FIELD10: 'Proxy',
  NETWORK_INFO_FIELD11: 'User certificate',
  LEGAL_INFO_TITLE: 'LEGAL INFORMATION',
  LEGAL_INFO_FIELD1: 'EULA title',
  LEGAL_INFO_FIELD2: 'EULA URL',
  DEVICE_PROFILE_TILE: 'DEVICE OWENER PROFILE INFORMATION',
  DEVICE_PROFILE_FIELD1: 'Device owner EMM',
  DEVICE_PROFILE_FIELD2: 'Device Owner APK download URL',
  DEVICE_PROFILE_FIELD3: 'Admin package name',
  DEVICE_PROFILE_FIELD4: 'Admin package signature checksum',
  DEVICE_PROFILE_FIELD5: 'Device Owner profile server URI',
  DEVICE_PROFILE_FIELD6: 'Custom JSON data',
  DEVICE_PROFILE_FIELD7: 'Root/Intermediate certificate',
  DEVICE_CONFIG_TILE: 'Device & Peripheral Configuration',
  DEVICE_CONFIG_FIELD1: 'Device & Peripheral Configuration',
  DEVICE_CONFIG_FIELD2: 'Knox service plug-in installation',
  DEVICE_CONFIG_FIELD3: 'Package name',
  DEVICE_CONFIG_FIELD4: 'Package signing key',
  APP_INFO_TITLE: 'APPLICATION CONFIGURATION',
  APP_INFO_FIELD1: 'Package name',
  APP_INFO_FIELD2: 'Package signing key',
  APP_INFO_FIELD3: 'Package download URL',
  NO_INPUT: 'No Input',
  BUTTON_GENERATE: 'GENERATE QR CODE',
  BUTTON_RESET: 'RESET',
};

export const OK = 'OK';
export const CANCEL = 'CANCEL';
export const RESET = 'RESET';
export const RESET_DATA = 'Reset data';
export const RESET_POPUP_DESCRIPTION =
  'Do you want to reset this data? If you reset profiles, reset all profiles data and move to `Select profiles` step. ';

export const SAVE_AS_DRAFT = 'Save as draft';
export const CLOSE_BUTTON_POPUP_DESCRIPTION =
  'Your data will be lost if it is not exported to XML file. Drafts let you save your edits, so that this profile will be saved in Profiles list and you can come back later.';
export const SAVE_DRAFT = 'SAVE DRAFT';
export const DISCARD = 'DISCARD';
export const PASSCODE_FORM_STRINGS = {
  TITLE: 'Enter your passcode',
  DESCRIPTION1: 'Enter passcode. (text TBD)',
  DESCRIPTION2: 'If you forgot your passcode, contact the service center.',
  PLACE_HOLDER: 'Enter passcode',
  ERROR_TEXT: 'This passcode is wrong. Try again.',
};
export const TITLEBAR_TITLE = 'PCT';

export const GENERAL_CONFIG_FORM_STRINGS = {
  PAGE_TITLE: 'DEVICE CONFIGURATION',
  FORM_TITLE: 'General configuration',
  SUB_TEXT: 'Select and configure category below.',
  BUTTON_CONTINUE: 'CONTINUE',
  BUTTON_RESET: 'RESET',
  IF: 'IF:',
  THEN: 'THEN:',
  KEYBOARD_PER_APP: '4. KEYBOARD PER APP',
  PLACEHOLDER_KEY_IF: 'App Activity',
  PLACEHOLDER_KEY_THEN: 'Keyboard Settings Value',
  PLACEHOLDER_SSID: 'Keyboard Settings Value',
  ADD_NEW_CONDITIONS: 'Add new conditions',
  NFC: '1. NFC',
  ENABLE: 'Enable',
  DISABLE: 'Disable',
  WIFI_DISALLOW: '2. DISALLOW TO ADD WIFI TO BLOCKLIST',
  WIFI_PREVENT: 'Prevent to block a specific AP connection because of adding to blocklist accidentally',
  SSID: 'SSID',
  SYSTEM_LANGUAGE_COUNTRY: '3. SYSTEM LANGUAGE & COUNTRY',
  SET_LANGUAGE: 'Set Language',
  SET_COUNTRY: 'Set Country',
  ADD_SSID: 'ADD SSID',
};

export const PROFILE_LIST_FORM_STRINGS = {
  PROFILES: 'Profiles',
  SEARCH: 'Search',
  CREATE_PROFILE: 'CREATE PROFILE',
  DELETE_PROFILE: 'DELETE PROFILE',
  NO_DATA_SUBTEXT1: 'Create a new profile to deploy an EMM via QR code',
  NO_DATA_SUBTEXT2:
    'Or Create a new profile to configure your device settings or peripheral devices settings.',
};
