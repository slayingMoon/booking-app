import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import './List.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';

export default function List() {

    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [options, setOptions] = useState(location.state.options);
    const [openDate, setOpenDate] = useState(false);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

    const handleClick = () => {
        reFetch();
    };

    const handleOption = (name, value) => {
        setOptions(prev => {
            return {
                ...prev, 
                [name]: value 
            }
        });
    };

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="list-container">
                <div className="list-wrapper">
                    <div className="list-search">
                        <h1 className="ls-title">Search</h1>
                        <div className="ls-item">
                            <label>Destination</label>
                            <input type="text" onChange={e => setDestination(e.target.value)} placeholder={destination}/>
                        </div>
                        <div className="ls-item">
                            <label>Check-in Date</label>
                            <span onClick={() => setOpenDate(!openDate)}>
                            {`${format(dates[0].startDate, "MM/dd/yyyy")} 
                                to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                            </span>
                            {openDate && 
                            <DateRange 
                                onChange={(item) => setDates([item.selection])}
                                minDate={new Date()}
                                ranges={dates}
                                className="date"
                            />}
                        </div>
                        <div className="ls-item">
                            <label>Options</label>
                            <div className="ls-options">
                                <div className="ls-option-item">
                                    <span className="ls-option-text">
                                        Min price <small>per night</small>
                                    </span>
                                    <input type="number" onChange={e => setMin(e.target.value)} className="ls-option-input" />
                                </div>
                                <div className="ls-option-item">
                                    <span className="ls-option-text">
                                        Max price <small>per night</small>
                                    </span>
                                    <input type="number" onChange={e => setMax(e.target.value)} className="ls-option-input" />
                                </div>
                                <div className="ls-option-item">
                                    <span className="ls-option-text">
                                        Adult
                                    </span>
                                    <input 
                                        type="number" 
                                        className="ls-option-input" 
                                        min={1}
                                        placeholder={options.adult}
                                        onChange={e=> handleOption("adult", e.target.value)}
                                    />
                                </div>
                                <div className="ls-option-item">
                                    <span className="ls-option-text">
                                        Children
                                    </span>
                                    <input 
                                        type="number" 
                                        className="ls-option-input" 
                                        min={0}
                                        placeholder={options.children}
                                        onChange={e=> handleOption("children", e.target.value)}
                                    />
                                </div>
                                <div className="ls-option-item">
                                    <span className="ls-option-text">
                                        Room
                                    </span>
                                    <input 
                                        type="number" 
                                        className="ls-option-input" 
                                        min={1}
                                        placeholder={options.room}
                                        onChange={e=> handleOption("room", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="list-result">
                        {loading ? "loading..." :
                        <>
                            {data?.map(item => (
                                <SearchItem item={item} key={item._id} />
                            ))}
                        </>}
                    </div>
                </div>
            </div>
        </div>
    );
};