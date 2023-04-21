import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routers } from "./routers";
import * as Pages from "../Pages";
import * as Layouts from "../Layouts";

export const RouterComponent = (props) => {
    let PageComponent, LayoutComponet;
    
    return (
        <Routes>
            {
                routers.map(
                    ({
                        element, 
                        path, 
                        exact = false, 
                        children = [],
                        redirect
                    }) => {
                        if (redirect) {
                            return (
                                <Route 
                                    path={path} 
                                    exact={exact} 
                                    key={path} 
                                    element={<Navigate to={redirect} replace />} 
                                />
                            )
                        }
                        if (children.length > 0) {
                            LayoutComponet = Layouts[element];
                            return (
                                <Route 
                                    path={path} 
                                    exact={exact} 
                                    key={path} 
                                    element={<LayoutComponet {...props}/>} 
                                >
                                    {
                                        children?.length && children.map(
                                            ({
                                                element: ChildrenElement,
                                                path: childrenPath,
                                                exact: childrenExact
                                            }) => {
                                                PageComponent = Pages[ChildrenElement];
                                                return (
                                                    <Route
                                                        path={path + childrenPath}
                                                        exact={childrenExact}
                                                        key={path + childrenPath}
                                                        element={
                                                            <>
                                                                <PageComponent {...props}/>
                                                            </>
                                                        }
                                                    />
                                                );
                                            }
                                        )
                                    }
                                </Route>
                            )
                        } else {
                            PageComponent = Pages[element];
                            return (
                                <Route 
                                    path={path} 
                                    exact={exact} 
                                    key={path} 
                                    element={<PageComponent {...props}/>} 
                                />
                            )
                        }
                    }
                )
            }
        </Routes>
	);
};

