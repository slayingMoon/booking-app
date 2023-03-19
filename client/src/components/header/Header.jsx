import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faPlane, faCar, faToriiGate, faTaxi, faUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';



export default function Header() {
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

      const [optionsOpen, setOptionsOpen] = useState(false);
      const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
      });

      const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev, 
                [name]: operation === 'i' 
                ? options[name] + 1 
                : options[name] - 1
            }
        });
      };

    return (
        <div className="header">
            <div className="header-container">
                <div className="header-list">
                    <div className="header-list-item active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="header-list-item">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="header-list-item">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="header-list-item">
                        <FontAwesomeIcon icon={faToriiGate} />
                        <span>Attractions</span>
                    </div>
                    <div className="header-list-item">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                <h1 className="header-title">Find your next stay</h1>
                <p className="header-desc">
                    Search low prices on hotels, homes and much more...
                </p>
                <div className="header-search">
                    <div className="header-search-item">
                        <FontAwesomeIcon icon={faBed} className="header-icon" />
                        <input 
                            type="text" 
                            placeholder="Where are you going?" 
                            className="header-search-input" 
                        />
                    </div>
                    <div className="header-search-item">
                        <FontAwesomeIcon icon={faCalendarDays} className="header-icon" />
                        <span onClick={() => setCalendarOpen(!calendarOpen)} className="header-search-text">
                            {`${format(date[0].startDate, "MM/dd/yyyy")} 
                            to ${format(date[0].endDate, "MM/dd/yyyy")}`
                            }
                        </span>
                        {calendarOpen && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="date"
                        />}
                    </div>
                    <div className="header-search-item">
                        <FontAwesomeIcon icon={faUser} className="header-icon" />
                        <span onClick={() => setOptionsOpen(!optionsOpen)} className="header-search-text">
                            {`${options.adult} adults · ${options.children} children · ${options.room} room`}
                        </span>
                        {optionsOpen && <div className="options">
                            <div className="option-item">
                                <span className="option-text">Adult</span>
                                <div className="option-counter">
                                    <button 
                                        disabled={options.adult <= 1}
                                        className="option-counter-button" 
                                        onClick={() => handleOption("adult", "d")}
                                    >-</button>
                                    <span className="option-counter-number">{options.adult}</span>
                                    <button className="option-counter-button" onClick={() => handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="option-item">
                                <span className="option-text">Children</span>
                                <div className="option-counter">
                                    <button 
                                        disabled={options.children <= 0}
                                        className="option-counter-button" 
                                        onClick={() => handleOption("children", "d")}
                                    >-</button>
                                    <span className="option-counter-number">{options.children}</span>
                                    <button className="option-counter-button" onClick={() => handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="option-item">
                                <span className="option-text">Room</span>
                                <div className="option-counter">
                                    <button 
                                        disabled={options.room <= 1}
                                        className="option-counter-button" 
                                        onClick={() => handleOption("room", "d")}
                                    >-</button>
                                    <span className="option-counter-number">{options.room}</span>
                                    <button className="option-counter-button" onClick={() => handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="header-search-item">
                        <button className="header-btn">Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
}