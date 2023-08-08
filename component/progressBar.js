import '@style/menu.css';
function ProgressBar({ value, color }) {
    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${value}%`, backgroundColor: `${color}` }}></div>
        </div>
    );
}

export default ProgressBar;