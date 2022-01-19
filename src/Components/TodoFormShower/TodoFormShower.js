import React from 'react';
import { useParams } from 'react-router-dom';
import Form from '../Form/Form';

const TodoFormShower = () => {
    const { todoid } = useParams();
    return (
        <div>
            <Form></Form>
        </div>
    );
};

export default TodoFormShower;