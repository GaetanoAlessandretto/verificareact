import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { AppContext } from "@/ContextProvider";
import { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const { cart } = useContext(AppContext);
    const router = useRouter();

    return (
        <div>
            <Grid container spacing={2}>
                {cart?.map((card) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                            <Card sx={{ width: 270, height: 400, margin: 1 }}>
                                <CardContent>
                                    <h2>{card.title}</h2>
                                    <p>{card.description}</p>
                                    <p>Prezzo: {card.price} Euro</p>
                                    <p>Quantità: {card.quantity}</p>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained" color="primary" style={{ marginLeft: '1100px', marginTop: '14px' }} onClick={() => router.push('/success')}>EFFETTUA IL PAGAMENTO</Button>
        </div>
    );
}
