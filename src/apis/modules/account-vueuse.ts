import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const instance = axios.create({baseURL: 'api'})

const { data, isFinished, execute } = useAxios('/posts', instance)

/**
 * Get posts
 *
 * @return {*}
 */
 const getPosts = () => {
    return execute()
};

export { getPosts };