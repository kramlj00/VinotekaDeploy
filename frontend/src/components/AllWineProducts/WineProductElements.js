import styled from "styled-components";

export const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
export const Card = styled.a`
  text-decoration: none;
  border: 0.1rem #c0c0c0 solid;
  width: 370px;
  background-color: #f8f8f8;
  border-radius: 0.5rem;
  margin: 1rem;
`;
export const CardBody = styled.div`
  padding: 1rem;
  font-family: "Quicksand", sans-serif;
`;
export const Image = styled.div`
  position: relative;
  img {
    border-radius: 0.5rem;
    max-width: 100%;
    max-height: 100%;
  }

  //   .medium {
  //     max-width: 22rem;
  //     width: 100%;
  //   }
`;

export const Sort = styled.p`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 18px;
  color: #6c757d;
`;

export const Title = styled.h2`
  color: #000;
`;

export const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #6c757d;
`;

/*
{data.products.map((product) => {
        <Card key={product._id}>
          <Image>
            <img src={product.image} className="medium" alt="wine_product1" />
          </Image>
          <CardBody>
            <Sort>{product.category}</Sort>
            <Title>{product.sort}</Title>
            <Price>- {product.price} HRK</Price>
          </CardBody>
        </Card>;
      })}

*/
