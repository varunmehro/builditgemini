import { COMPONENT_TYPES } from '@/lib/schema';
import { Header, Text, Input, Button, StatsCard } from '../ui/Primitives';

export const COMPONENT_REGISTRY = {
    [COMPONENT_TYPES.HEADER]: Header,
    [COMPONENT_TYPES.TEXT]: Text,
    [COMPONENT_TYPES.INPUT]: Input,
    [COMPONENT_TYPES.BUTTON]: Button,
    [COMPONENT_TYPES.STATS_CARD]: StatsCard,
};

export const AppRenderer = ({ schema }) => {
    if (!schema || !schema.pages || schema.pages.length === 0) return null;

    // MVP: Render the first page
    const page = schema.pages[0];

    return (
        <div className="app-container" style={{ padding: '24px' }}>
            {page.components.map((comp) => {
                const Component = COMPONENT_REGISTRY[comp.type];
                if (!Component) return <div key={comp.id}>Unknown component: {comp.type}</div>;
                return <Component key={comp.id} {...comp.props} />;
            })}
        </div>
    );
};
