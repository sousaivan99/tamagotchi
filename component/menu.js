
import '@style/menu.css';
import ProgressBar from './progressBar';

function getColor(value) {
    const colorScale = [
        { threshold: 30, color: 'red' },
        { threshold: 65, color: 'yellow' },
        { threshold: 100, color: 'var(--green)' },
    ];

    for (const item of colorScale) {
        if (value <= item.threshold) {
            return item.color;
        }
    }

    // Fallback to green if the value is higher than the highest threshold
    return 'var(--green)';
}

function Menu({ happiness, hunger, sleep, coin }) {
    const colorh = getColor(happiness);
    const colorHung = getColor(hunger);
    const colorSleep = getColor(sleep);
    return (
        <>
            <header className='header'>
                <div className="status">
                    <div className='status-item'>
                        <span>Happiness</span>
                        <ProgressBar value={happiness} color={colorh} />
                    </div>
                    <div className='status-item'>
                        <span>Hunger</span>
                        <ProgressBar value={hunger} color={colorHung} />
                    </div>
                    <div className='status-item'>
                        <span>Sleep</span>
                        <ProgressBar value={sleep} color={colorSleep} />
                    </div>
                </div>
                <span className='coin'>Money: {coin}</span>
            </header>
        </>);
}

export default Menu;