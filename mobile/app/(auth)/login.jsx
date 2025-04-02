import {Text, TouchableOpacity, View} from "react-native";
import {Container} from "../../components/Container";
import {router} from "expo-router";
import BetaBar from "../../components/BetaBar";
import AppBtn from "../../components/AppBtn";
import FormField from "../../components/FormField";
import {useState} from "react";
import login from "../../api/login"
import {save} from "../../api/jwt";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("black");

    const submitLogin = async (email, pwd) => {
        const result = await login(form.email, form.password);
        if (!result.token) {
            setMessage(result.message);
            setMessageColor("red");
        } else {
            setMessage(result.token);
            setMessageColor("green");

            await save("userJWT", result.token);

            //redirect to index=>profile
            //but for now directly redirect to profile
            router.replace("/profile");
        }
    }

    return (
        <Container>
            <BetaBar/>
            <Text className="mx-5">Connectez-vous :</Text>

            <FormField
                title="addresse email"
                value={form.email}
                handleChangeText={(e) => setForm({...form, email: e})}
            />

            <FormField
                title="mot de passe"
                value={form.password}
                handleChangeText={(e) => setForm({...form, password: e})}
            />

            <AppBtn
                title="Connexion"
                handlePress={() =>
                    submitLogin(form.email, form.password)
                }
            />

            <Text style={{color: messageColor}}>{message}</Text>

            <TouchableOpacity
                onPress={() => router.replace("/register")}>
                <Text>Pas de compte ?</Text>
            </TouchableOpacity>
        </Container>
    )
}