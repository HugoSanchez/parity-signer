/* eslint-disable */

// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

'use strict';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, HeaderBackButton, withNavigation } from 'react-navigation';
import { Provider as UnstatedProvider } from 'unstated';
import '../ReactotronConfig';
import colors from './colors';
import Background from './components/Background';
import HeaderLeftHome from './components/HeaderLeftHome';
import SecurityHeader from './components/SecurityHeader';
import TabBarBottom from './components/TabBarBottom';
import About from './screens/About';
import AccountAdd from './screens/AccountAdd';
import AccountBackup from './screens/AccountBackup';
import AccountDetails from './screens/AccountDetails';
import AccountEdit from './screens/AccountEdit';
import AccountList from './screens/AccountList';
import AccountNetworkChooser from './screens/AccountNetworkChooser';
import AccountNew from './screens/AccountNew';
import AccountPin from './screens/AccountPin';
import AccountRecover from './screens/AccountRecover';
import { AccountUnlock, AccountUnlockAndSign } from './screens/AccountUnlock';
import Loading from './screens/Loading';
import PrivacyPolicy from './screens/PrivacyPolicy';
import QrScanner from './screens/QrScanner';
import Security from './screens/Security';
import SignedTx from './screens/SignedTx';
import TermsAndConditions from './screens/TermsAndConditions';
import TxDetails from './screens/TxDetails';


export default class App extends Component {
  render() {
    return (
      <UnstatedProvider>
        <StatusBar barStyle="light-content" />
        <Background />
        <Screens />
      </UnstatedProvider>
    );
  }
}

const globalStackNavigationOptions = {
  headerTintColor: colors.card_bg,
  headerRight: <SecurityHeader />,
  headerStyle: {
    backgroundColor: colors.bg,
    height: 60,
    paddingTop: 0,
    paddingBottom: 0,
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bg_text_sec
  },
  headerTitleStyle: {
    display: 'none'
  },
  headerBackTitleStyle: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Manifold CF'
  }
};

// A workaround for https://github.com/react-navigation/react-navigation/issues/88
const SecurityHeaderBackButton = withNavigation(
  class _HeaderBackButton extends Component {
    render() {
      const { navigation } = this.props;
      return (
        <HeaderBackButton
          {...this.props}
          titleStyle={globalStackNavigationOptions.headerBackTitleStyle}
          title="Back"
          tintColor={colors.card_bg}
          onPress={() => navigation.goBack(null)}
        />
      );
    }
  }
);

const Screens = createStackNavigator(
  {
    Loading: {
      screen: Loading
    },
    Security: {
      screen: createStackNavigator(
        {
          Security: {
            screen: Security,
            navigationOptions: {
              headerTintColor: colors.card_bg,
              headerLeft: <SecurityHeaderBackButton />,
              headerRight: null
            }
          }
        },
        {
          headerMode: 'screen',
          navigationOptions: globalStackNavigationOptions
        }
      )
    },
    TocAndPrivacyPolicy: {
      screen: createStackNavigator(
        {
          TermsAndConditions: {
            screen: TermsAndConditions,
            navigationOptions: {
              headerLeft: <HeaderLeftHome />
            }
          },
          PrivacyPolicy: {
            screen: PrivacyPolicy
          }
        },
        {
          navigationOptions: globalStackNavigationOptions,
          initialRouteParams: {
            isWelcome: true
          }
        }
      )
    },
    Welcome: {
      screen: createStackNavigator(
        {
          AccountAdd: {
            screen: AccountAdd,
            navigationOptions: {
              headerLeft: <HeaderLeftHome />
            }
          },
          AccountNetworkChooser: {
            screen: AccountNetworkChooser
          },
          AccountNew: {
            screen: AccountNew
          },
          AccountRecover: {
            screen: AccountRecover
          },
          AccountBackup: {
            screen: AccountBackup
          },
          AccountPin: {
            screen: AccountPin
          }
        },
        {
          navigationOptions: globalStackNavigationOptions,
          initialRouteParams: {
            isWelcome: true
          }
        }
      )
    },
    Tabs: {
      screen: createBottomTabNavigator(
        {
          Scanner: {
            screen: createStackNavigator(
              {
                QrScanner: {
                  screen: QrScanner,
                  navigationOptions: {
                    headerLeft: <HeaderLeftHome />
                  }
                },
                TxDetails: {
                  screen: TxDetails
                },
                AccountUnlockAndSign: {
                  screen: AccountUnlockAndSign
                },
                SignedTx: {
                  screen: SignedTx
                }
              },
              {
                navigationOptions: globalStackNavigationOptions
              }
            )
          },
          Accounts: {
            screen: createStackNavigator(
              {
                AccountList: {
                  screen: AccountList,
                  navigationOptions: {
                    headerLeft: <HeaderLeftHome />
                  }
                },
                AccountNew: {
                  screen: AccountNew
                },
                AccountAdd: {
                  screen: AccountAdd
                },
                About: {
                  screen: About
                },
                AccountNetworkChooser: {
                  screen: AccountNetworkChooser
                },
                AccountRecover: {
                  screen: AccountRecover
                },
                AccountBackup: {
                  screen: AccountBackup
                },
                AccountPin: {
                  screen: AccountPin
                },
                AccountDetails: {
                  screen: AccountDetails
                },
                AccountUnlock: {
                  screen: AccountUnlock
                },
                AccountEdit: {
                  screen: AccountEdit
                }
              },
              {
                mode: 'card',
                // cardStyle: { backgroundColor: 'transparent' },
                // transitionConfig: () => ({
                //   containerStyle: {
                //     backgroundColor: 'transparent'
                //   }
                // }),
                navigationOptions: globalStackNavigationOptions
              }
            )
          }
        },
        {
          tabBarComponent: props => <TabBarBottom {...props} />,
          tabBarPosition: 'bottom'
        }
      )
    }
  },
  {
    headerMode: 'none',
    mode: 'card'
    // transitionConfig: (): Object => ({
    //   containerStyle: {
    //     backgroundColor: 'transparent'
    //   }
    // }),
    // cardStyle: { backgroundColor: 'transparent' }
  }
);
