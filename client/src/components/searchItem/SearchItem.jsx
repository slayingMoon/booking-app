import { Link } from 'react-router-dom';
import './SearchItem.css';

export default function SearchItem({item}) {
    return (
        <div className="search-item">
            <img 
                src={item.photos[0]}
                alt="" 
                className="si-img" 
            />
            <div className="si-desc">
                <h1 className="si-title">{item.name}</h1>
                <span className="si-distance">{item.distance}m from center</span>
                <span className="si-taxi-op">Free airport taxi</span>
                <span className="si-subtitle">Studio Apartment with Air conditioning</span>
                <span className="si-features">Entire studio • 1 bathroom • 21m² 1 full bed</span>
                <span className="si-cancel-op">Free cancelation</span>
                <span className="si-cancel-op-subtitle">You can cancel later, so lock in this great price today!</span>
            </div>
            <div className="si-details">
                {item.rating &&
                <div className="si-rating">
                    <span>Excellent</span>
                    <button>8.9</button>
                </div>}
                <div className="si-detail-texts">
                    <span className="si-price">${item.cheapestPrice}</span>
                    <span className="si-tax-op">Includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                    <button className="si-check-button">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};