import './MailList.css';

export default function MailList() {
    return (
        <div className="mail">
            <h1 className="mail-title">Save time, save money!</h1>
            <span className="mail-desc">Sign up and we'll send the best deals to you</span>
            <div className="mail-input-container">
                <input type="text" placeholder="Your email address" />
                <button>Subscribe</button>
            </div>
        </div>
    );
}