
import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import './InfoBox.css';

function InfoBox({ title, cases, total }) {

    return (

        <div className="infobox">
            <Card>
                <CardContent>
                    <Typography color="textsecondary">
                        {title}

                    </Typography>
                    <h2 className="infobox__cases">{cases}</h2>
                    {/*Ttile of carona cases/}
                    {/*Total nuber of corrona cases*/}
                    {/*120+ cases*/}
                    <Typography className="infobox__total">{total}</Typography>

                </CardContent>

            </Card>

        </div>
    );
}

export default InfoBox;
