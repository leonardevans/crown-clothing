import { useNavigate } from 'react-router-dom';

import {BackGroundImage, Body, DirectoryItemContainer} from './directory-item.styles.jsx';

const DirectoryItem = ({category})=>{
    const {imageUrl, title, id, route} = category;

    const navigate = useNavigate()

    const onNavigateHandler = () => navigate(route)
    
    return(
        <DirectoryItemContainer key={id} onClick={onNavigateHandler}>
          <BackGroundImage
          imageUrl={imageUrl}
          />

          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem