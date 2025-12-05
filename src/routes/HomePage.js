import '../App.css';
import InputsForm from '../components/inputs_and_outputs';
import NavBar from '../components/NavBar';
import ThemeProvider from '../components/common/ThemeProvider';

const HomePage = () => {
    return (
        <ThemeProvider>
            <div className="App">
                <NavBar />
                <InputsForm />
            </div>
        </ThemeProvider>
    );
}

export default HomePage;