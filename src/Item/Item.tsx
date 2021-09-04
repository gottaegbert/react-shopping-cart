import Button from "@material-ui/core/Button"
//Types
import { CartItemType } from "../App"
//styles
import { Wrapper } from './Item.styles';

type Props = {
    item: CartItemType;
    handleAddtoCart: (clickeddItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleAddtoCart }) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={ () => handleAddtoCart(item)}>Add to cart</Button>
    </Wrapper>
)
export default Item;