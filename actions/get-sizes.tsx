import { Size } from "@/types";

const URL = `${process.env.API_URL}/sizes`

const getSizes = async () : Promise<Size[]> => {
    const res = await fetch(URL); 
    return res.json()
}

export default getSizes