import React, {useState} from 'react';
import './components/sass/App.sass';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const champNames = [
  "Aatrox",
  "Ahri",
  "Akali",
  "Alistar",
  "Amumu",
  "Anivia",
  "Annie",
  "Aphelios",
  "Ashe",
  "AurelionSol",
  "Azir",
  "Bard",
  "Blitzcrank",
  "Brand",
  "Braum",
  "Caitlyn",
  "Camille",
  "Cassiopeia",
  "Chogath",
  "Corki",
  "Darius",
  "Diana",
  "DrMundo",
  "Draven",
  "Ekko",
  "Elise",
  "Evelynn",
  "Ezreal",
  "Fiddlesticks",
  "Fiora",
  "Fizz",
  "Galio",
  "Gangplank",
  "Garen",
  "Gnar",
  "Gragas",
  "Graves",
  "Hecarim",
  "Heimerdinger",
  "Illaoi",
  "Irelia",
  "Ivern",
  "Janna",
  "JarvanIV",
  "Jax",
  "Jayce",
  "Jhin",
  "Jinx",
  "Kaisa",
  "Kalista",
  "Karma",
  "Karthus",
  "Kassadin",
  "Katarina",
  "Kayle",
  "Kayn",
  "Kennen",
  "Khazix",
  "Kindred",
  "Kled",
  "KogMaw",
  "Leblanc",
  "LeeSin",
  "Leona",
  "Lissandra",
  "Lucian",
  "Lulu",
  "Lux",
  "Malphite",
  "Malzahar",
  "Maokai",
  "MasterYi",
  "MissFortune",
  "Mordekaiser",
  "Morgana",
  "Nami",
  "Nasus",
  "Nautilus",
  "Neeko",
  "Nidalee",
  "Nocturne",
  "Nunu",
  "Olaf",
  "Orianna",
  "Ornn",
  "Pantheon",
  "Poppy",
  "Pyke",
  "Qiyana",
  "Quinn",
  "Rakan",
  "Rammus",
  "RekSai",
  "Renekton",
  "Rengar",
  "Riven",
  "Rumble",
  "Ryze",
  "Sejuani",
  "Senna",
  "Sett",
  "Shaco",
  "Shen",
  "Shyvana",
  "Singed",
  "Sion",
  "Sivir",
  "Skarner",
  "Sona",
  "Soraka",
  "Swain",
  "Sylas",
  "Syndra",
  "TahmKench",
  "Taliyah",
  "Talon",
  "Taric",
  "Teemo",
  "Thresh",
  "Tristana",
  "Trundle",
  "Tryndamere",
  "TwistedFate",
  "Twitch",
  "Udyr",
  "Urgot",
  "Varus",
  "Vayne",
  "Veigar",
  "Velkoz",
  "Vi",
  "Viktor",
  "Vladimir",
  "Volibear",
  "Warwick",
  "MonkeyKing",
  "Xayah",
  "Xerath",
  "XinZhao",
  "Yasuo",
  "Yorick",
  "Yuumi",
  "Zac",
  "Zed",
  "Ziggs",
  "Zilean",
  "Zoe",
  "Zyra",
]

const rowsFromBackend = {
  champs: {
    name: 'LIST',
    items: champNames.map(champ => {return { id: champ, content: champ }})
  },
  tier: {
    name: 'TIER',
    items: []
  }
}

const onDragEnd = (result, rows, setRows) => {
  if(!result.destination) return;
  const { source, destination } = result;
  if(source.droppableId !== destination.droppableId){
    const sourceRow = rows[source.droppableId];
    const destRow = rows[destination.droppableId];
    const sourceItems = [...sourceRow.items];
    const destItems = [...destRow.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0 , removed);
    setRows({
      ...rows,
      [source.droppableId]: {
        ...sourceRow,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destRow,
        items: destItems
      }
    })
  } else {
    const row = rows[source.droppableId];
    const copiedItems = [...row.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setRows({
      ...rows,
      [source.droppableId]: {
        ...row,
        items: copiedItems
      }
    })
  }
}

function App() {
  const [rows, setRows] = useState(rowsFromBackend);
  return (
    <div className="app">
      <DragDropContext onDragEnd={result => onDragEnd(result, rows, setRows)}>
        <div className="rows">
          {Object.entries(rows).map(([id, row]) => {
            return(
              <div className="sections">
                <h2>{row.name}</h2>
                  <Droppable droppableId={id} key={id}>
                    {(provided) => {
                      return(
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: '#456c86'
                          }}
                          className="container"
                        >
                          {row.items.map((item, index) => {
                            return(
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => {
                                  return(
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 5,
                                        backgroundColor: '#456C86',
                                        color: 'white',
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      <img className="champ" alt="champ" src={require(`./components/images/champion/${item.content}.png`)} />
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
            )
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
