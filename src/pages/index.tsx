import Head from 'next/head'

import { GetServerSidePropsContext } from 'next';
import Image from "next/image";


import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { GroupedProducts, groupProductsByCategory } from '@/utils/groupProductsByCategory';



import * as React from 'react';
import { HomeHeroCategories } from '@/components/HomeHeroCategories';
import { Categories } from '@/models/Categories';
import { Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, Grid, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { AdvantageSection } from '@/components/AdvantageSection';
import { HomeProductsGrid } from '@/components/HomeProductsGrid';
import { PromoBanner } from '@/components/PromoBanner';
import { BlogPostCard } from '@/components/BlogPostCard';

import bannerSale from '/public/banner-sale.jpg';
import bannerNewSeason from '/public/banner-new-season.jpg';
import womenStanding from '/public/woman-standing.png';
import menWalking from '/public/men-walking.png';
import blogPic1 from '/public/blog-pic-01.jpg';
import blogPic3 from '/public/blog-pic-03.jpg';
import blogPic2 from '/public/blog-pic-02.jpg';







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
  categories: Categories[],
  productsGroupedByCategory: GroupedProducts[],
}

//Componente de react, la pagina es todo un componente.







export default function Home({categories, productsGroupedByCategory }: Props) {
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
        <Container >
          <HomeHeroCategories categories={categories}></HomeHeroCategories>
          <AdvantageSection />
        </Container>
        <Container>
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
        
        <Container background={'linear-gradient( #F3F2F2 0%, #DCDBDB 100%);'} m={{
          base: "14.75rem 0 0",
          md: "2rem auto",
        }} p={{
          base: "1.5rem",
          md: "3.55rem",
        }} maxW="100%" position="relative">
          <Box position={"absolute"} w={{
            base: "99px",
            md: "219px",
          }} h={{
            base: "236px",
            md: "524px",
          }}
          top={{
            base: "calc(-236px + 1.5rem)",
            md: "initial",
          }}
          bottom={{
            md: "0",
          }}
          right={{
            base: "2rem",
            md: "50%",
          }}
          transform={{
            md: "translateX(470px)",
          }}>
            <Image src={menWalking} alt='' fill={true} style={{ objectFit: 'cover'}}/>
          </Box>
          <Box position={"absolute"} w={{
            base: "128px",
            md: "311px",
          }} h={{
            base: "242px",
            md: "545px",
          }} top={{
            base: "calc(-242px + 1.5rem)",
            md: "initial",
          }} bottom={{
            md: "0",
          }} left={{
            base: "1.5rem",
            md: "50%",
          }} transform={{
            md: "translateX(-530px)",
          }}>
            <Image src={womenStanding} alt='' fill={true} style={{ objectFit: 'cover'}} />
          </Box>
          <Flex 
            h={{
            md: "28.75rem",
            }} 
            maxW="33rem" margin="auto" as="article" bgColor="white" p="2rem" textTransform="uppercase">
            <Grid gap="2rem" maxW="22rem" m="auto" textAlign="center" >
              <header>
                <Heading size="sm" color="gray">
                  Special Offer
                </Heading>
                <Heading size="lg">
                  Subscribe <br></br> and <Text as="span" color="red">get 10% off</Text>
                </Heading>
              </header>
              < Grid as="form" action='' gap="1.5rem">
                <FormControl>
                  <Input
                    type='email'
                    borderRadius="0"
                    textAlign="inherit"
                    placeholder="Enter your email"
                    h="4rem"
                    backgroundColor="gray.100" />
                </FormControl>
                <Button bgColor="black" size="lg" h="4rem" borderRadius="0" w="100%">Subscribe</Button>
              </Grid>
            </Grid>
          </Flex>
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

        <Container>
          <Heading as="h2" fontSize="2xl" textTransform="uppercase" m="2rem">Latest from blogpost</Heading>
          <SimpleGrid minChildWidth="300px" spacing={{
            base: "2.5rem",
            md: "1.5rem"
          }}>
            <BlogPostCard 
              image={blogPic1}
              title="The Easiest Way to Break"
              summary="But I must explain to you how all this mistaken idea of denouncing pleas and praising pain was bor"
            />
            <BlogPostCard 
              image={blogPic2}
              title="Wedding Season"
              summary="But I must explain to you how all this mistaken idea of denouncing pleas and praising pain was bor"
            />
            <BlogPostCard 
              image={blogPic3}
              title="Recent Favorites On Repeat"
              summary="But I must explain to you how all this mistaken idea of denouncing pleas and praising pain was bor"
            />

          </SimpleGrid>
        </Container>

 


        {/* {<HomeProductsGrid products={products}></HomeProductsGrid>}  */}
      </main>
    </>
  )
}
//esta parte del código se ejecuta en el servidor, se está tratando de obtener el contenido antes de cargar la página.
export async function getServerSideProps(context: GetServerSidePropsContext) {

  const products = await fetch('https://fakestoreapi.com/products')
    .then(res => res.json());

  const categories = await fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json());

  const productsGroupedByCategory = groupProductsByCategory(products);

  return {
    props: {
      categories,
      productsGroupedByCategory,
    },
  };
}