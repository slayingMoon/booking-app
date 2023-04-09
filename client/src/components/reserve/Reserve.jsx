import { faCircleXmark, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import './Reserve.css';

const Reserve = ({setOpen, hotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        const dates = [];

        while(date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => allDates.includes(new Date(date).getTime()));
        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;

        setSelectedRooms(
            checked 
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );
    };

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`/rooms/availability/${roomId}`, {
                        dates: allDates,
                    });
                    return res.data;
                })
            );
            setOpen(false);
            navigate("/");
        }catch(err) {
            
        }
    };

    return (
        <div className="reserve">
            <div className="r-container">
                <FontAwesomeIcon 
                    icon={faCircleXmark} 
                    className="r-close" 
                    onClick={() => setOpen(false)}
                />
                <span>Select your rooms:</span>
                {data.map(item => (
                    <div className="r-item" key={item._id}>
                        <div className="r-item-info">
                            <div className="r-title">{item.title}</div>
                            <div className="r-desc">{item.desc}</div>
                            <div className="r-max">
                                Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className="r-price">${item.price}</div>
                        </div>
                        <div className="r-select-rooms">
                            {item.roomNumbers.map(roomNumber => (
                                <div className="room" key={roomNumber._id}>
                                    <label>{roomNumber.number}</label>
                                    <input 
                                        type="checkbox" 
                                        value={roomNumber._id} 
                                        onChange={handleSelect} 
                                        disabled={!isAvailable(roomNumber)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="res-button">Reserve Now!</button>
            </div>
        </div>
    );
};

export default Reserve;