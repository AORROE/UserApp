import {StackNavigator} from 'react-navigation';

import User from '../pages/UserPage';
import TabNg from '../navigator/TabNg';
import UserInfo from '../pages/UserInfoPage';
import Login from '../pages/LoginPage';
import NewRegister from '../pages/NewRegisterPage';
import NewHome from '../pages/NewHome';
import SearchPage from '../pages/SearchPage';
import OrderDetail from "../pages/OrderDetailPage";
import OrderStackNavigator from '../navigator/OrderNavigation';
import AnalusisPage from '../pages/AnalusisPage';
import Evaluate from '../pages/EvaluatePage';
import Cocmanage from '../pages/CocmanagePage';
import GoodsPage from '../pages/GoodsPage';
import GoodsDetailPage from '../pages/GoodsDetailPage';
import GoodsAdd from '../pages/GoodsAddPage';
import MainTainPage from '../pages/MainTainPage';
import MainTainDetail from '../pages/MainTainDetailPage';
import DiscountPage from '../pages/DiscountPage';
import DiscountTimePage from '../pages/DiscountTimePage';
import NewDiscount from '../pages/NewDiscount';
import NT from "../utils/NavigatorTools";


const PagerNavigator = StackNavigator({
    Main:{
        screen:TabNg,
        navigationOptions:{
            header:null
        }
    },
    User:{
        screen:User
    },

    UserInfo :{
        screen:UserInfo
    },

    Login :{
        screen:Login,
        navigationOptions:{
            header:false
        }
    },

    NewRegister:{
        screen:NewRegister,

    },
    Home:{
        screen:NewHome
    },

    SearchPage:{
        screen:SearchPage,

        navigationOptions:{
            header:null
        },
    },

    OrderStackNavigator:{
        screen:OrderStackNavigator,
        navigationOptions:{
            header:null
        }
    },
    OrderDetail :{
        screen:OrderDetail,
    },

    AnalusisPage :{
        screen:AnalusisPage,
        navigationOptions:{
            header:false
        }
    },

    Evaluate:{
        screen:Evaluate,
        navigationOptions:{
        }
    },

    Cocmanage:{
        screen:Cocmanage,
        navigationOptions:{
            headerStyle: {backgroundColor: '#25d6f4'},
            headerTitleStyle: {color: '#fff', alignSelf: 'center'},
        }
    },

    Goods :{
        screen:GoodsPage,
        navigationOptions:{
            headerStyle: {backgroundColor: '#25d6f4'},
            headerTitleStyle: {color: '#fff', alignSelf: 'center'},
        }
    },

    GoodsDetail :{
        screen:GoodsDetailPage,
        navigationOptions:{
            headerStyle: {backgroundColor: '#25d6f4'},
            headerTitleStyle: {color: '#fff', alignSelf: 'center'},
        }

    },

    GoodsAdd :{
        screen:GoodsAdd,
        navigationOptions:{
            headerStyle: {backgroundColor: '#25d6f4'},
            headerTitleStyle: {color: '#fff', alignSelf: 'center'},
        }
    },

    MainTain:{
        screen:MainTainPage,
        navigationOptions:{
            headerStyle: {backgroundColor: '#25d6f4'},
            headerTitleStyle: {color: '#fff', alignSelf: 'center'},
        }
    },

    MainTainDetail:{
        screen:MainTainDetail,
        navigationOptions:{
            headerStyle: {backgroundColor: '#25d6f4'},
            headerTitleStyle: {color: '#fff', alignSelf: 'center'},
        }
    },

    Discount :{
        screen:DiscountPage
    },

    DiscountTime :{
        screen:DiscountTimePage
    },

    NewDiscount:{
        screen:NewDiscount
    },




});

export default PagerNavigator;