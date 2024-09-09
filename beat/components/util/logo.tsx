import Image from "next/image"; 

export interface LogoProps {
    name: string;
    src: string;
    alt: string;
    size?: number; 
    height?: number; 
    width?: number;
}

const Logo : React.FC<LogoProps>  = ({ name, src, alt, size, height, width }) => {
    if(!name && !src && !alt) {
        throw new Error("Logo cannot be Empty"); 
    }

    let f_height; 
    let f_width;
     
    if(!size && !height){
        f_height = 50; 
    }else if(!height){
        f_height = size;
    }
    if(!size && !width){
        f_width = 50;
    }else if(!width){
        f_width = size;
    }

    return(
        
        <div>
            <Image src = {src} alt = {alt} height = {f_height} width = {f_width} />  
        </div>
    ); 
}

export default Logo