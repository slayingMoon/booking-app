import './Hotel.css';
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';

export default function Hotel() {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { data, loading, error } = useFetch(`/hotels/find/${id}`);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { dates, options } = useContext(SearchContext);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    const days = dayDifference(dates[0].startDate, dates[0].endDate);

      const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
      };

      const handleMove = (direction) => {
        let newSlideNumber;

        if(direction === 'l') {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        }else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber);
      };

      const handleClick = () => {
        console.log('handle click')
        if(user) {
            setOpenModal(true);
        }else {
            navigate("/");
        }
      };

    return (
        <div>
            <Navbar />
            <Header type="list"/>
            {loading ? "loading..." : 
            <div className="hotel-container">
                {open && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")}/>
                    <div className="slider-wrapper">
                        <img src={data.photos[slideNumber]} alt="" className="slider-img" />
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")}/>
                </div>}
                <div className="hotel-wrapper">
                    <button onClick={handleClick} className="book-now-btn">Reserve or Book Now!</button>
                    <h1 className="hotel-title">{data.name}</h1>
                    <div className="hotel-address">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.address}</span>
                    </div>
                    <span className="hotel-distance">
                        Excellent location - {data.distance}m from center
                    </span>
                    <span className="hotel-price-highlight">
                        Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                    </span>
                    <div className="hotel-images">
                        {data.photos?.map((photo, i) => (
                            <div className={i === 0 ? 'hotel-img-wrapper thumb' : 'hotel-img-wrapper'} key={i}>
                                <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotel-img" />
                            </div>
                        ))}
                    </div>
                    <div className="hotel-details">
                        <div className="hotel-details-texts">
                            <h1 className="hotel-title">{data.title}</h1>
                            <p className="hotel-desc">
                                {data.desc}
                            </p>
                        </div>
                        <div className="hotel-details-price">
                            <h1>Perfect for a {days}-night stay!</h1>
                            <span>
                                Located in the real heart of Krakow, this property has an
                                excellent location score of 9.8!
                            </span>
                            <h2>
                                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                            </h2>
                            <button onClick={handleClick}>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>}
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
        </div>
    );
};