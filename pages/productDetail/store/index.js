import Vue from "vue";
import Vuex from 'vuex';
 
Vue.use(Vuex)
 
//用于响应组件中的动作
const actions = {
    //加入购物车
    addCart(context,item){
        context.commit('ADDCART',item)
        alert("加入购物车成功");
    },
    //复选框
    selectItem(context,item){
        context.commit("SELECTITEM", item);
    },
 
    //加商品
    addItem(context,item){
        context.commit('ADDITEM',item);
    },
    //减商品
    subItem(context,item){
        context.commit('SUBITEM',item);
    },
     //删除商品
     delete(context,index){
        context.commit('DELETE',index);
    }
};
 
//用于真正改变数据
const mutations = {
    //加入购物车
    ADDCART(state, item){
        //判断本地是否有数据，默认没有
        let flag = false;
 
        //遍历在state中的cartList
        state.cartList.map(ele => {
            //判断state保存本地的id和传过来的id是否一样
            
            if(ele.item.name == item.name){
                flag = true;
                ele.item.count++
				console.log('id是一样的')
            }
        })
        console.log('item', item)
        if(!flag){
            state.cartList.push({item})
        }
 
    },
    //复选框
    SELECTITEM(state, item){
        item.item.checked = !item.item.checked;
    },
    //加商品
    ADDITEM(state,item){
        item.count++;
    },
    //减商品
    SUBITEM(state,item){
        if(item.count > 1){
            item.count--;
       }
    },
    //删除商品
    DELETE(state,index){
        state.cartList.splice(index, 1);
    },
};
     
//用于存放数据
const state = {
    cartList:[],//存放购物车商品数据的数组
    totalPrice:0,
    totalNum: 0, 
};
 
const getters = {
    totalPrice: state => {
        let totalNum = 0;
        let totalPrice = 0;
        state.cartList.filter(item => {
            if(item.item.checked){
                totalNum ++;
                totalPrice += item.item.count * item.item.price;
            }
        })
        return totalPrice;
    },
    totalNum: state => {
        let totalNum = 0;
        state.cartList.filter(item => {
            if(item.item.checked){
                totalNum =totalNum+ item.item.count;
            }
        })
        return totalNum;
    }
};
 
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})