import Head from 'next/head'

import { GetServerSidePropsContext } from 'next';
import Image from "next/image";


import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { GroupedProducts, groupProductsByCategory } from '@/utils/groupProductsByCategory';



import * as React from 'react';
import { HomeHeroCategories } from '@/components/HomeHeroCategories';
import { Categories } from '@/models/Categories';
import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { AdvantageSection } from '@/components/AdvantageSection';
import { HomeProductsGrid } from '@/components/HomeProductsGrid';

import bannerSale from '/public/banner-sale.jpg';
import bannerNewSeason from '/public/banner-new-season.jpg';
import { PromoBanner } from '@/components/PromoBanner';



//array con estos campos
export type Product = {
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
  categories: Categories[],
  productsGroupedByCategory: GroupedProducts[],
}

//Componente de react, la pagina es todo un componente.







export default function CompReactexportado({ products, categories, productsGroupedByCategory }: Props) {
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
      <Box marginBottom={{ base: "0", lg: "32px" }}>
        <Header />
      </Box>
      <main>
        <Container size={{
          lg: "lg",
        }}>
          <HomeHeroCategories categories={categories}></HomeHeroCategories>
          <AdvantageSection />
        </Container>

        <Container
          maxW={{
            base: "100%",
            md: "1110px",
          }} paddingX="0">
          {Object.entries(productsGroupedByCategory).map(([category, products]) => {
            return (
              <Box key={category} mb="4rem">
                <Heading as="h2" size="md" textTransform="uppercase" margin={{
                  base: "0 0 1rem .5rem",
                  md: "0 0 1.5rem",
                }}>
                  {category}
                </Heading>
                <HomeProductsGrid products={products} />
              </Box>
            );
          })}
        </Container>

        <Container size={{ lg: 'lg' }}>
          <SimpleGrid minChildWidth={255} spacing={{
            base: "1rem",
            md: "2rem",
          }}>
            {/* This form of import is to be used when we know an image dimensions. */}
            <PromoBanner image={bannerNewSeason}>
              <Text fontSize="sm" color="gray.400">
                New season
              </Text>
              <Text fontSize="md" whiteSpace={'nowrap'} fontStyle="bold">
                Lookbook collection
              </Text>
            </PromoBanner>
            <PromoBanner image={bannerSale}>
              <Text fontSize="sm" color="gray.400">
                Sale
              </Text>
              <Text fontSize="md" whiteSpace={'nowrap'} fontStyle="bold">
                Get up to <Text as="span" color="red">50% Off</Text>
              </Text>
            </PromoBanner>
          </SimpleGrid>
        </Container>


        {/* {<HomeProductsGrid products={products}></HomeProductsGrid>}  */}
      </main>
    </>
  )
}
//esta parte del código se ejecuta en el servidor, se está tratando de obtener el contenido antes de cargar la página.
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: { products: any; categories: any; }; }> {

  const products = await fetch('https://fakestoreapi.com/products')
    .then(res => res.json());

  const categories = await fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json());

  const productsGroupedByCategory = groupProductsByCategory(products);

  return {
    props: {
      products,
      categories,
      productsGroupedByCategory,
    },
  };
}