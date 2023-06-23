import { Grid, Link, Stack, Typography, TableFooter, CssBaseline } from "@mui/material";
import Img from "../Image";

const style = {
    background: "#484543",
    display: "block",
    padding: "4.036% 5.14% 5.8% 5.35%",
}

function Footer() {
  return (
    <>
      <CssBaseline/>
        <TableFooter component={"footer"} style={style}>

            <Grid 
            container 
            spacing={1} 
            direction={{xs: "column", lg:"row"}} 
            justifyContent={{xs: "center", lg: "space-between"}} 
            alignItems="center"
            >
                <Grid 
                item 
                className="footer_text" 
                textAlign={{xs: "center", lg: "start"}}
                >
                    <Typography variant="h5" gutterBottom style={{color: "#FFFFFF", fontWeight: "700"}}>Apple Shop</Typography>
                    <Typography variant="subtitle1" component="p" color="textSecondary" style={{color: "#FFFFFF"}} gutterBottom>
                        © Copyright 2023. Created by OurTeam
                    </Typography>
                </Grid>

                <Grid 
                item 
                className="footer_links" 
                aria-label="figma button group"
                >
                    <Stack direction="row" spacing={2}>
                        <Link href="https://uk-ua.facebook.com/" underline="none" target="_blank">
                            <Img
                                src="../../img/facebook.png"
                                alt="facebook"
                                className="link-img link-img__facebook"
                            />
                        </Link>
                        <Link href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2F" underline="none" target="_blank">
                            <Img
                                src="../../img/instagram.png"
                                alt="instagram"
                                className="link-img link-img__instagram"
                            />
                        </Link>
                        <Link href="https://twitter.com/?lang=uk" underline="none" target="_blank">
                            <Img
                                src="../../img/twitter.png"
                                alt="twitter"
                                className="link-img link-img__twitter"
                            />
                        </Link>
                        <Link href="https://www.youtube.com/" underline="none" target="_blank">
                            <Img
                                src="../../img/youtube.png"
                                alt="youtube"
                                className="link-img link-img__youtube"
                            />
                        </Link>
                    </Stack>
                </Grid>    

            </Grid>
        </TableFooter>
    </>
  );
}

export default Footer;