import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [sensors, setSensors] = useState([])

  // 1. LER DADOS (GET) - Forçando a leitura na porta 8080
  const fetchData = async () => {
    try {
      console.log("Tentando buscar dados na porta 8080...");
      const response = await axios.get('http://localhost:8080/api/sensors');
      console.log("Dados recebidos do Java:", response.data);
      setSensors(response.data);
    } catch (error) {
      console.error("Erro ao ler os dados do Java:", error);
    }
  }

  // 2. ENVIAR DADOS (POST) - Forçando o envio na porta 8080
  const simulateData = async () => {
    const types = ['QUALIDADE_DO_AR', 'NIVEL_DE_RESIDUOS', 'CONSUMO_DE_ENERGIA']
    const units = ['AQI', '%', 'kWh']
    const randIdx = Math.floor(Math.random() * 3)
    const randomValue = parseFloat((Math.random() * 100).toFixed(2));

    const newSensor = {
      type: types[randIdx],
      value: randomValue,
      unit: units[randIdx]
    }

    try {
      console.log("1. Enviando dado...");
      await axios.post('http://localhost:8080/api/sensors', newSensor);
      
      console.log("2. Enviado com sucesso! Aguardando sincronização...");
      
      // Pequena pausa de 300ms para o Banco de Dados processar antes de pedirmos a lista nova
      setTimeout(() => {
        fetchData(); 
        console.log("3. Interface atualizada com novos dados.");
      }, 300);

    } catch (error) {
      console.error("Erro na simulação:", error);
    }
  }

  // Busca inicial assim que a tela carrega
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container">
      <header className="header">
        <h1>🌱 EcoCity Monitor</h1>
        <p>Dashboard de Integração OT/IT - Cidades Inteligentes</p>
      </header>
      
      <button className="simulate-btn" onClick={simulateData}>
        📡 Simular Leitura de Sensor IoT
      </button>
      
      <div className="dashboard">
  {sensors.length === 0 ? <p>Nenhum dado de sensor registrado ainda.</p> : null}
  
  {/* Filtramos para exibir apenas o último registro de cada tipo de sensor */}
  {Object.values(sensors.reduce((acc, sensor) => {
    // Se o sensor ainda não está no "acumulador" ou se o timestamp atual é mais novo
    if (!acc[sensor.type] || new Date(sensor.timestamp) > new Date(acc[sensor.type].timestamp)) {
      acc[sensor.type] = sensor;
    }
    return acc;
  }, {})).map(sensor => (
    <div key={sensor.type} className="card">
      <h3>{sensor.type.replace(/_/g, ' ')}</h3>
      <p className="value">{sensor.value} <span>{sensor.unit}</span></p>
      <small>Última atualização: {new Date(sensor.timestamp).toLocaleString()}</small>
    </div>
  ))}
</div>
    </div>
  )
}

export default App