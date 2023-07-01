import React from "react";
import { useState, useEffect, useRef } from "react";
import * as tf from '@tensorflow/tfjs'
import Data from './data/Data.csv'
export default function Rice() {
    const model = useRef(null)
    
    React.useEffect(() => {
        const loadCSV = () => {
            readRemoteFile(Data, {
            download: true,
            header:true,
            dynamictyping: true,
            complete: (results) => {
                    csvLoaded(results.data)
                }
            })
        }
        const csvLoaded = (data) => {
            console.log("DATA LOADED")
            console.log(data)
        }
    
        loadCSV()
    }, [])
    
    const predict = () => {
        // Predict
    }
    
    return (
        <div>
            <button onPress={predict}>Predict</button>
        </div>
    );
  }

