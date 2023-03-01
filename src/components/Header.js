export default function Header({ pagename, buttons }) {
    return (
        <header>
            <h2 className="pagename">{pagename}</h2>
            {buttons}
        </header>
    );
}
