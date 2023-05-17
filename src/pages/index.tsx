import Head from 'next/head'

import { GetServerSidePropsContext } from 'next';


import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import Image from "next/image";



import * as React from 'react';
import { HomeHeroCategories } from '@/components/HomeHeroCategories';
import { Categories } from '@/models/Categories';
import { AspectRatio, Box, Container, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { AdvantageSection } from '@/components/AdvantageSection';


//array con estos campos
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  }
}


type Props = {
  products: Product[],
  categories: Categories[]
}

//Componente de react, la pagina es todo un componente.




export default function CompReactexportado({ products, categories }: Props) {
  //render con react es con map, se cogieron los productos de los props exportados directamente (iteraciones)
  return (
    <>
      <Head>
        <title>eCommerce Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar />
      <Box marginBottom="32px">
        <Header />
      </Box>
      <main>
        <Container size="lg">
          <HomeHeroCategories categories={categories}></HomeHeroCategories>
          <AdvantageSection />
          <Flex alignItems="center" minWidth="max-content" justifyContent="space-between" >
          <Grid templateColumns="repeat(4, 1fr)" gap=".5rem">
          
                  {
                    products.map((pro) => {
                      return  <Box margin="2rem auto" width="255px" border="solid 2px" borderColor="gray.100">
                                  <AspectRatio position="relative" key={pro.id} ratio={1} maxWidth="100%"><Image src={pro.image} alt={''} fill={true} style={{ objectFit: "contain" }}></Image></AspectRatio>
                                  <Text fontSize="xs">{pro.title}</Text><Text>{pro.price}</Text>
                              </Box>
                    })
                  }
          </Grid>
        </Flex>
        </Container>
        

        {/* {<ol>
          {products.map(product => {
            return <li key={product.id}><strong>{product.title}</strong></li>
          })}
        </ol>} */}
      </main>
    </>
  )
}
//esta parte del código se ejecuta en el servidor, se está tratando de obtener el contenido antes de cargar la página.
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: { products: any; categories: any; }; }> {

  const products = await fetch('https://fakestoreapi.com/products')
    .then(res => res.json())

  const categories = await fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())

  console.log(categories);
  return {
    props: {
      products,
      categories
    }
  }
}