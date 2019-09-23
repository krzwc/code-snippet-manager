import React, { useEffect } from "react";
import PickTech from "../../components/PickTech";
import { AppProps, AppState } from "./types";
import { selectTech, fetchSnippetsIfNeeded } from "../../actions";
import { connect } from "react-redux";

// const initialState: AppState = {
//   selectedTech: "javascript",
//   snippetsByTech: {
//     isFetching: false,
//     items: []
//   }
// };

export const App = ({ selectedTech, items, dispatch }: AppProps) => {
  // const [state, setState] = useState(initialState);

  // const fetchAPI = async (tech: string) => {
  //   try {
  //     const req = await fetch(ENDPOINT + `${tech}`);
  //     const res = await req.json();
  //     const results = res.data;
  //     setState({
  //       selectedTech: tech,
  //       snippetsByTech: {
  //         isFetching: false,
  //         items: results.data.snippetsByTechnology
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const fetchSnippets = (tech: string) => {
    dispatch(selectTech(tech));
    dispatch(fetchSnippetsIfNeeded(tech));
  };

  useEffect(() => {
    fetchSnippets(selectedTech);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTech]);

  return (
    <div className="App">
      <PickTech
        value={selectedTech}
        onChange={fetchSnippets}
        options={["javascript", "visual-studio"]}
      />
      {items &&
        items.map(item => (
          <div key={item._id}>
            {item.description} - {item.code}
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  const { selectedTech, snippetsByTech } = state;
  const { isFetching, items } = snippetsByTech;

  return {
    selectedTech,
    isFetching,
    items
  };
};

export default connect(mapStateToProps)(App);
