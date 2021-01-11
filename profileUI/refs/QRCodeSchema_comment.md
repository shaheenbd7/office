<pre>
{
    "type": "object",
    "description": "JSON schema for the QR code contents",
    "properties": {
      "profileID": { // 유니크한 값. 숫자로 넘겨도 무방
        "type": "string",
        "description": "Unique Id for the profile sent"
      },
      "clType": { // 불필요
        "type": "string",
        "description": "Corporate liable device or not",
        "required": "false"
      },
      "organizationName": {
        "type": "string",
        "description": "Name of the organization"
      },
      "serviceType": { // "PCT" 고정
        "type": "string",
        "description": "Type of enrollment",
        "value": "PCT"
      },
      "countryISO": { // 불필요
        "type": "string",
        "description": "Country code for the device to enroll",
        "required": "false"
      },
      "skipDeviceEula": { // 불필요
        "type": "boolean",
        "description": "Option to skip the device eula",
        "required": "false"
      },
      "additionalScanCount": { // 값이 2라면, QR이 2개 더 존재함을 의미.
        "type": "integer",
        "description": "Number of additional scans required to process the whole profile",
        "required": "false"
      },
      "selfUpdateAgentHref": { // 불필요
        "type": "string",
        "description": "Self-update URL for KES to download from",
        "required": "false"
      },
      "wifiInfo": {
        "type": "object",
        "description": "WiFi configuration parameters",
        "properties": {
          "password": {
            "type": "string",
            "description": "WiFi password"
          },
          "securityType": {
            "type": "string",
            "description": "Security type for the WiFi protocol",
            "values": "NONE, WEP, WPA, EAP"
          },
          "ssid": {
            "type": "string",
            "description": "WiFi ssid for the device to connect to"
          },
          "hidden": {
            "type": "boolean",
            "description": "network is hidden or not",
            "required" : false
          },
          "skipMacRandomization": {
            "type": "boolean",
            "description": "Skip Wifi MAC randomization",
            "default": "false"
          },
          "eapMethod": {
            "type": "string",
            "description": "EAP method of the wifi network.",
            "values": "PEAP, TLS, TTLS, PWD, SIM, AKA, AKA_PRIME"
          },
          "phase2Auth": {
            "type": "string",
            "description": "Phase 2 authentication of the wifi network. This is only used if the security type is EAP.",
            "values": "NONE, PAP, MSCHAP, MSCHAPV2, GTC, SIM, AKA, AKA_PRIME"
          },
          "caCertificate": {
            "type": "string",
            "description": "CA certificate of the wifi network.This is only used if the security type is EAP. PEM format with no headers and footers"
          },
          "userCertificate": {
            "type": "string",
            "description": "User certificate of the wifi network. This is only used if the security type is EAP"
          },
          "identity": {
            "type": "string",
            "description": "Identity of the wifi network. This is only used if the security type is EAP"
          },
          "anonymousIdentity": {
            "type": "string",
            "description": "Anonymous identity of the wifi network. This is only used if the security type is EAP"
          },
          "proxyHost": {
            "type": "string",
            "description": "Proxy host for the wifi network"
          },
          "proxyPort": {
            "type": "integer",
            "description": "Proxy port for the wifi network"
          },
          "proxyBypassHosts": {
                "type": "array",
                "description": "The proxy bypass list for the wifi network",
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "description": "Proxy bypass url"
                    }
                  ]
                }
              },
          "proxyAutoConfigUrl": {
            "type": "string",
            "description": "PAC Url"
          }
           
        }
      },
      "eulas": {
        "type": "array",
        "description": "Custom EULAs to be displayed on device",
        "required": "false",
        "items": {
          "anyOf": [
            {
              "type": "object",
              "description": "EULA details",
              "properties": {
                "title": {
                  "type": "string",
                  "description": "Custom EULA title"
                },
                "href": {
                  "type": "string",
                  "description": "Custom EULA link"
                }
              }
            }
          ]
        }
      },
      "appContent": {
        "type": "array",
        "description": "Additional content for other applications on device",
        "required": "false",
        "items": {
          "anyOf": [
            {
              "type": "object",
              "description": "Content details",
              "properties": {
                "details": { // 불필요
                  "type": "string",
                  "description": "App content to be sent"
                },
                "href": {
                  "type": "string",
                  "description": "URL link to download the content"
                },
                "packageName": { // KSP 패키지명
                  "type": "string",
                  "description": "Package name for whom the content is targeted for"
                }
              }
            }
          ]
        }
      },
      "management": {
        "type": "object",
        "description": "Device management details and configuration",
        "properties": {
          "certificates": {
            "type": "array",
            "description": "List of certificate data",
            "items": {
              "anyOf": [
                {
                  "type": "object",
                  "description": "Certificate details",
                  "properties": {
                    "alias": { // 파일명
                      "type": "string",
                      "description": "Certificate alias"
                    },
                    "href": { // 불필요
                      "type": "string",
                      "description": "Link to download the certificate from"
                    },
                    "pem": { // 파일 내용
                      "type": "string",
                      "description": "PEM encoded certificate data",
                      "required": "false"
                    }
                  }
                }
              ]
            }
          },
          "agent": {
            "type": "object",
            "description": "EMM agent details",
            "properties": {
              "href": {
                "type": "string",
                "description": "URL link for the EMM agent"
              },
              "packageName": {
                "type": "string",
                "description": "Package name of the EMM agent"
              },
              "version": { // false로 전달 --> "0" 
                "type": "string",
                "description": "Minimum version code for the EMM agent",
                "required" : false
              },
              "signatures": {
                "type": "array",
                "description": "An explanation about the purpose of this instance.",
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "description": "URL-safe base64 encoded SHA-256 checksum of any signature of the android package"
                    }
                  ]
                }
              },
              "adminComponent": {
                "type": "string",
                "description": "Admin component of the package"
              }
            }
          },
          "secondaryAgents": {
            "type": "array",
            "description": "List of secondary agents",
            "items": {
              "anyOf": [
                {
                  "type": "object",
                  "description": "An explanation about the purpose of this instance.",
                  "properties": {
                    "href": {
                      "type": "string",
                      "description": "URL link for the secondary agent"
                    },
                    "packageName": {
                      "type": "string",
                      "description": "Package name of the application"
                    },
                    "version": { // false로 전달 --> "0" 
                      "type": "string",
                      "description": "Minimum version code of the application"
                    },
                    "signatures": {
                      "type": "array",
                      "description": "An explanation about the purpose of this instance.",
                      "items": {
                        "anyOf": [
                          {
                            "type": "string",
                            "description": "URL-safe base64 encoded SHA-256 checksum of any signature of the android package"
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            }
          },
          "payload": {
            "type": "object",
            "description": "Data to be sent to EMM agent",
            "properties": {
              "mdmProfileCustomData": { // 'Device owner profile server URI'와 'Custom JSON Data' 문자열을 합하여 전달
                "type": "string",
                "description": "Custom data to be sent to EMM like credentials, group etc"
              },
              "deviceCustomData": {
                "type": "string",
                "description": "Custom data to be sent to EMM like credentials"
              }
            }
          },
          "adminIntegratedFlow": {
            "type": "boolean",
            "description": "Choose whether to let MDM decide to go DO or PO",
            "value" : "true"
          }
        }
      }
    }
  }

  </pre>
