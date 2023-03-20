import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import Popular from "../../components/popular/Popular";
import PropertyList from "../../components/propertyList/PropertyList";
import "./Home.css";

export default function Home() {
    return (
        <>
            <Navbar />
            <Header />
            <div className="home-container">
                <Featured />
                <h1 className="home-title">Browse by property type</h1>
                <PropertyList />
                <h1 className="home-title">Homes guests love</h1>
                <Popular />
                <MailList />
                <Footer />
            </div>
        </>
    );
};