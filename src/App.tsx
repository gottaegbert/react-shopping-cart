import { useState } from "react";
import { useQuery } from "react-query";
//Componetsim
import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from "@material-ui/core/LinearProgress"
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
//Styles
import { Wrapper,StyledButton } from './App.style';
import { Badge } from "@material-ui/core";
import { AccessAlarm } from "@material-ui/icons";
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems,setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data)

  const getTotalItems = (items:CartItemType[]) => null;
  const handleAddtoCart = (clickeddItem:CartItemType) => {
    setCartItems(prev => {
      //1. Is the item already added in cart?
      const isItemInCart = prev.find(item => item.id === clickeddItem.id)
      if(isItemInCart){
        return prev.map(item => (
          item.id === clickeddItem.id
          ?{...item,amount:item.amount+1}:item
        ));
      }
      //First time the items is added
      return[...prev,{...clickeddItem,amount:1}]
    })
  };
  const handleRemoveFromCart = (id= number) => {
    setCartItems(prev => (
      prev.reduce((ack,item) => {
          if(item.id === id) {
            if(item.amount === 1) return ack;
            return [...ack,{...item,amount:item.amount-1}];
          }
          else{
            return [...ack,item];
          }
      },[] as CartItemType[])
    ))
  };
  if (isLoading) return <LinearProgress />
  if(error) return <div>something wrong</div>
  return (
    
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
       <Cart 
       cartItems={cartItems}
       addToCart={handleAddtoCart}
       removeFromCart={handleRemoveFromCart}
       />
      </Drawer>
      <StyledButton onClick={()=> setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
        <Grid item key={item.id} xs={12} sm={4}>
          <Item item={item} handleAddtoCart={handleAddtoCart} />         
      </Grid>
      ))}
      </Grid>
    </Wrapper>

  );
}

export default App;
