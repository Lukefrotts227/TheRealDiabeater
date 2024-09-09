import { LogoProps } from "@/components/util/logo";

export type Link = {
    name: string; 
    route: string;
}

export interface NavbarProps {
    links?: Link[]; 
    special_links?: Link[];
    title?: string;
    Logo?: React.ReactElement<LogoProps>; 
    Auth?: React.ReactElement; 

}; 


const Navbar: React.FC<NavbarProps> = ({ links, special_links, title, Logo, Auth }) => {
    if(!links && !special_links && !title && !Logo && !Auth) {
        throw new Error("Navbar cannot be Empty"); 
    }
    if (special_links && special_links.length > 2) {
        throw new Error("Cannot have more than 2 special links");
    }
    if (links && links.length > 8){
        throw new Error("Cannot have more than 8 links"); 
    }

    return(
        <nav className = "bg-gradient-to-tl from-green-200 to-green-400 via-green-300 fixed-0 top-0 left-0 w-full z-10 shadow-lg ">
            <div id="container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div id = "subcontainer" className = "flex items-center justify-between h-14">
                        { Logo ?(
                            <div id="logo">
                                {Logo}
                            </div>
                            ) : null
                        }
                        { title ? (
                            <div id="title">
                                <h1 className = "text-4xl font-bold">{title}</h1>
                            </div>
                            ) : null
                        }
                        { special_links ? (
                            <div id ="special_links"> 
                                <ul>
                                    {}
                                </ul>

                            </div>
                            ) : null
                        }
                        { links ? (
                            <div id="links">
                                <ul>
                                    
                                </ul>

                            </div>
                            ) : null
                        }
                        { Auth ? Auth : null}
                </div>
            </div>
        </nav>
    ); 
 
}; 
export default Navbar; 
