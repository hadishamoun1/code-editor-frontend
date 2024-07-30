import React, { useState, useEffect } from "react";
import "./landing.css";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import { Link } from "react-router-dom";

const Landing = () => {
    
    const [search, setSearch] = useState('');
    const [developers, setDevelopers] = useState([]);
    const [error, setError] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [suggestionFlag, setSuggestionFlag] = useState(false);
    const searchDevelopers =  async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users`, {
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            console.log(data.users);
            if (data.message) {
                setError(data.message);
            } else {
                setDevelopers(data.users);
            }
        } catch (error) {
            setError('Failed to fetch developers.');       
        }
    };
    useEffect(() => {
        searchDevelopers();
    }, []);
    useEffect(() => {
        setFiltered(developers.filter((developer) => developer.name.toLowerCase().includes(search.toLowerCase())));
    }, [search]);

    return (
        <div className="landing">
            <div className="flex row">
                <div className="flex row">
                    <img className="logo" src= {`${process.env.PUBLIC_URL}/Logo.png`}></img>
                    <p className="name">CodeNest</p>
                </div>
                <Input 
                placeholder={"Search for developers..."}
                onTextChange={(e) => setSearch(e.target.value)}
                onMouseClick={() => setSuggestionFlag(true)}
                onBlur={() => setSuggestionFlag(false)}
                
                />
                 {error && <p>{error}</p>}
                 {suggestionFlag && filtered.length > 0 && (
                 <ul className="suggestions-list">
                    {filtered.map((developer, index) => (
                        <li key={index} className="suggestion-item">
                            {developer.name}
                        </li>
                    ))}
                </ul>
            )}
                <div className="flex nav-items">
                    <p><Link to="/chats">Chats</Link></p>
                    <p><a href="#footer">Contact us</a></p>
                </div>
            </div>
            <div className="flex column">
                <img className="hero" src= {`${process.env.PUBLIC_URL}/hero.png`}></img>
                <Button 
                    text= "Start Building"
                    onMouseClick={() => console.log("clicked")}
                />
            </div>
            <div>
                <h1>Why us?</h1>
                <p className="why-us">
                   Our code editor stands out as the ultimate tool for developers, providing a seamless and intuitive coding experience. <br></br>
                   With features like real-time collaboration and extensive language support, our editor is designed to boost productivity and streamline your 
                   <br></br>workflow. <br></br>
                   Its sleek, user-friendly interface makes it easy for both beginners and seasoned professionals to write, debug, and deploy code efficiently. <br></br>
                   Choose our code editor and transform the way you code, collaborate, and create.</p>
            </div>
            <section id="footer">
            <div className="footer flex column">
                <h2>Contact us</h2>
                <p>Let's build a secure code together </p>
                <div className="flex row icons">
                    <a href="https://www.facebook.com" target="_blank">
                        <img src={`${process.env.PUBLIC_URL}/Facebook.png`}></img>
                    </a>
                    <a href="https://www.instagram.com" target="_blank">
                        <img src={`${process.env.PUBLIC_URL}/Instagram.png`}></img>
                    </a>
                    <a href="" target="_blank">
                        <img src={`${process.env.PUBLIC_URL}/Phone.png`}></img>
                    </a>
                </div>
            </div>
            </section>
        </div>

    );
};

export default Landing;