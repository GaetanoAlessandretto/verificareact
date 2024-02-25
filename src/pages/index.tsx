import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { AppContext } from "@/ContextProvider";
import { useContext } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { products, addToCart } = useContext(AppContext)
  const router = useRouter();
  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Card sx={{ width: 270, height: 370, margin: 1 }}>
              <CardContent>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Prezzo: {product.price} Euro</p>
              </CardContent>
              <Box display="flex" justifyContent="center">
                <Button onClick={() => addToCart(product.id)} variant="contained">AGGIUNGI</Button>
              </Box>
            </Card>
          </Box>
        </div>
      ))}
    </div>
  )
}
