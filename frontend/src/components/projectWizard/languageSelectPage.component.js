import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectLanguage, deselectLanguage, deselectBook} from "../../actions/projectCreationActions";
import LanguageApiAdapter from "../../api/languageApiAdapter";

class LanguageSelectPage extends Component {

    constructor(props) {
        super(props);

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            index: 0,
            searchString: '',
            languages: []
        }
    }

    componentDidMount() {
        this.setLanguagesInState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.searchString !== prevState.searchString) {
            this.setLanguagesInState();
        }
    }

    setLanguagesInState() {
        LanguageApiAdapter.getFilteredLanguages(this.state.searchString)
            .then(languages => this.setState({ languages }));
    }

    renderLanguages() {
        return this.state.languages.map(language => {
            const isSelected = language.slug === this.props.selectedLanguage;
            return (
                <div key={language.slug}
                     onClick={() => this.props.selectLanguage(language.slug)}
                     className={"project-contributors__row " + (isSelected ? 'selected' : '')}
                >
                    {language.original_name} ({language.slug})
                </div>
            )
        });
    }

    handleCancel() {
        this.props.deselectLanguage();
        this.props.deselectBook();
        this.props.handleClose();
    }

    handleSearch(e) {
        this.setState({
            searchString: e.target.value.toLowerCase()
        });
    }

    handleScroll(e) {
        const container = e.target;
        if (container.offsetHeight + container.scrollTop >= container.scrollHeight) {
            const currentIndex = this.state.index;
            this.setState({ index: currentIndex + 10 })
            const languageList = this.state.languages;
            LanguageApiAdapter.getMoreLanguages(this.state.index)
                .then(newLanguages => 
                    this.setState({ 
                        languages: languageList.concat(newLanguages)
                    }));
        }
    }

    canContinue() {
        return this.props.selectedLanguage !== '';
    }

    render() {
        return (
            <>
                <p className="modal-title">Select Language</p>
                <input type="text" placeholder="Start typing a language name or code" onChange={this.handleSearch}/>
                <div className="language-select-list" onScroll={this.handleScroll}>{this.renderLanguages()}</div>
                <div className="form-control-group-right">
                    <button className="form-button" onClick={this.handleCancel}>
                        <i className="material-icons">clear</i>Cancel
                    </button>
                    <button className={"form-button " + (this.canContinue() ? '' : 'disabled')}
                            onClick={this.props.goToBookSelectPage}
                            disabled={!this.canContinue()}
                    >
                        <i className="material-icons">arrow_forward</i>Continue
                    </button>
                </div>
            </>
        )
    }

}

export default connect(
    state => ({
        selectedLanguage: state.selectedLanguage,
    }),
    {selectLanguage, deselectLanguage, deselectBook}
)(LanguageSelectPage);