import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

function About(){
    return (
        <>
        <Navbar/>
         <h1 id="x">Welcome to About Page</h1>


        <Link  href="/">Go Back</Link>
        <Image src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U3VuLCAzMCBBcHI%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00343983-ygslxsbbzf-portrait.jpg" width="210" height="310" alt="test img"/>
        </>
   
    )
}

export default About