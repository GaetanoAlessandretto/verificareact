import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { AppContext } from "@/ContextProvider";
import { useContext } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { products, addToCart } = useContext(AppContext)
  const router = useRouter();

  return (
    <Grid container spacing={2}>
      {products?.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ width: '80%', height: '100%' }}>
            <CardContent>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Prezzo: {product.price} Euro</p>
            </CardContent>
            <Box display="flex" justifyContent="center">
              <Button style={{ bottom: '0' }} onClick={() => addToCart(product.id)} variant="contained">AGGIUNGI</Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
