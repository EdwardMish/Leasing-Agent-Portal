import * as React from 'react';
import parse from 'html-react-parser';
import sanitize from 'sanitize-html';
import { LoadStatus } from '../../../Types';
import { ContentAPI, ContentTypes } from '..';

type UseContentByPathHook = (path: string) => {
    areLoaded: boolean;
    error: string;
    errorState: boolean;
    snippets: ContentTypes.Snippet[];
    getOverviewByPath: (path: string) => string | React.ReactElement | React.ReactElement[];
    getTooltipByPath: (path: string) => string | React.ReactElement | React.ReactElement[];
    getHelpByPath: (path: string) => string | React.ReactElement | React.ReactElement[];
    getSnippetByPath: (path: string) => ContentTypes.Snippet | null;
};

const useContentByPath: UseContentByPathHook = (path: string) => {
    const [error, setError] = React.useState<string>('');
    const [loadState, setLoadState] = React.useState<LoadStatus>(LoadStatus.INITIAL_STATE);
    const [snippets, setSnippets] = React.useState<ContentTypes.Snippet[]>([]);

    const getOverviewByPath = (overviewPath: string) =>
        snippets.length
            ? parse(
                  sanitize(
                      snippets.find((snippet) => snippet.path.toLowerCase().endsWith(overviewPath.toLowerCase()))
                          ?.overview || '',
                  ),
              )
            : '';

    const getTooltipByPath = (tooltipPath: string) =>
        snippets.length
            ? parse(
                  sanitize(
                      snippets.find((snippet) => snippet.path.toLowerCase().endsWith(tooltipPath.toLowerCase()))?.tooltip ||
                          '',
                  ),
              )
            : '';

    const getHelpByPath = (helpPath: string) =>
        snippets.length
            ? parse(
                  sanitize(
                      snippets.find((snippet) => snippet.path.toLowerCase().endsWith(helpPath.toLowerCase()))?.help || '',
                  ),
              )
            : '';

    const getSnippetByPath = (snippetPath: string): ContentTypes.Snippet | null =>
        snippets.find((snippet) => snippet.path.toLowerCase().endsWith(snippetPath.toLowerCase())) || null;

    React.useEffect(() => {
        if (
            loadState === LoadStatus.INITIAL_STATE ||
            !snippets.some((s) => s.path.toLowerCase().endsWith(path.toLowerCase()))
        ) {
            setLoadState(LoadStatus.PENDING);

            ContentAPI.getSnippetsForPath(path)
                .then((s: ContentTypes.Snippet[]) => {
                    setLoadState(LoadStatus.LOADED);
                    setError('');
                    setSnippets(snippets.concat(s));
                })
                .catch((err) => {
                    setLoadState(LoadStatus.ERROR);
                    setSnippets([]);

                    if (typeof err === 'string') {
                        setError(err);
                    } else {
                        setError('An error occured while loading snippets.');
                    }
                });
        }
    }, [path]);

    return {
        areLoaded: loadState === LoadStatus.LOADED || loadState === LoadStatus.ERROR,
        error,
        errorState: loadState === LoadStatus.ERROR,
        snippets,
        getOverviewByPath,
        getTooltipByPath,
        getHelpByPath,
        getSnippetByPath,
    };
};

export default useContentByPath;
